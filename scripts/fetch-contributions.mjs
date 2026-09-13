import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "src", "data", "githubContributions.ts");
const TOTAL_DAYS = 365;
const DAY_MS = 86_400_000;

function loadDotEnv() {
  const envPath = path.join(ROOT, ".env");
  if (!existsSync(envPath)) return;

  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;

    const eq = line.indexOf("=");
    if (eq === -1) continue;

    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function guessLogin() {
  if (process.env.GITHUB_USERNAME) return process.env.GITHUB_USERNAME;
  if (process.env.GITHUB_REPOSITORY_OWNER) {
    return process.env.GITHUB_REPOSITORY_OWNER;
  }

  try {
    const remote = execFileSync("git", ["remote", "get-url", "origin"], {
      encoding: "utf8",
    }).trim();
    const match = remote.match(/github\.com[/:]([^/]+)(?:\/[^/]+)?(?:\.git)?$/);
    if (match) return match[1];
  } catch {
    // no origin remote configured
  }

  return "octocat";
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

function toDateKey(date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

function startOfDay(date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function mulberry32(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildMockDays() {
  const rand = mulberry32(202513);
  const today = startOfDay(new Date());
  const from = new Date(today.getTime() - (TOTAL_DAYS - 1) * DAY_MS);
  const days = [];
  let streak = 0;

  for (let day = 0; day < TOTAL_DAYS; day += 1) {
    const date = new Date(from.getTime() + day * DAY_MS);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;

    let chance = isWeekend ? 0.42 : 0.3;
    chance += streak * 0.14;

    let count = 0;
    if (rand() < chance) {
      streak = Math.min(streak + 1, 3);
      const roll = rand();
      if (roll < 0.45) count = 1 + Math.floor(rand() * 2);
      else if (roll < 0.72) count = 3 + Math.floor(rand() * 3);
      else if (roll < 0.9) count = 6 + Math.floor(rand() * 6);
      else count = 12 + Math.floor(rand() * 14);
    } else {
      streak = 0;
    }

    days.push({ date: toDateKey(date), count });
  }

  return days;
}

async function fetchRealDays() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const login = guessLogin();
  if (login === "octocat") {
    console.warn(
      "[contributions] no GITHUB_USERNAME or origin remote found, defaulting to 'octocat'",
    );
  }
  const today = startOfDay(new Date());
  const from = new Date(today.getTime() - (TOTAL_DAYS - 1) * DAY_MS);

  const query = `
    query ($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify({
      query,
      variables: { login, from: from.toISOString(), to: today.toISOString() },
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API responded with ${response.status}`);
  }

  const payload = await response.json();
  if (payload.errors) {
    throw new Error(
      `GitHub API error: ${payload.errors.map((error) => error.message).join("; ")}`,
    );
  }

  const calendar =
    payload.data.user.contributionsCollection.contributionCalendar;
  return calendar.weeks.flatMap((week) =>
    week.contributionDays.map((entry) => ({
      date: entry.date,
      count: entry.contributionCount,
    })),
  );
}

function renderModule(days) {
  const lines = days.map(
    ({ date, count }) =>
      `  { date: ${JSON.stringify(date)}, count: ${count} },`,
  );
  return `export const rawContributions: Array<{ date: string; count: number }> = [
${lines.join("\n")}
];
`;
}

async function main() {
  loadDotEnv();
  let days = null;

  if (process.argv.includes("--mock")) {
    days = buildMockDays();
  } else if (process.env.GITHUB_TOKEN) {
    try {
      days = await fetchRealDays();
    } catch (error) {
      console.warn(`[contributions] skipping fetch: ${error.message}`);
      days = null;
    }
  }

  if (days) {
    writeFileSync(OUT, renderModule(days));
    const total = days.reduce((sum, day) => sum + day.count, 0);
    console.log(
      `[contributions] wrote ${days.length} days (${total} contributions) to ${path.relative(ROOT, OUT)}`,
    );
  } else if (!existsSync(OUT)) {
    writeFileSync(OUT, renderModule(buildMockDays()));
    console.log(
      `[contributions] no token, generated placeholder ${path.relative(ROOT, OUT)}`,
    );
  } else {
    console.log("[contributions] no token, leaving existing data untouched");
  }
}

main();