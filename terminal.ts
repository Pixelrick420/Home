export const asciiArt = [
  "██████╗ ██╗██╗  ██╗███████╗██╗     ██████╗ ██╗ ██████╗██╗  ██╗",
  "██╔══██╗██║╚██╗██╔╝██╔════╝██║     ██╔══██╗██║██╔════╝██║ ██╔╝",
  "██████╔╝██║ ╚███╔╝ █████╗  ██║     ██████╔╝██║██║     █████╔╝ ",
  "██╔═══╝ ██║ ██╔██╗ ██╔══╝  ██║     ██╔══██╗██║██║     ██╔═██╗ ",
  "██║     ██║██╔╝ ██╗███████╗███████╗██║  ██║██║╚██████╗██║  ██╗",
  "╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝ ╚═════╝╚═╝  ╚═╝",
];

const RESET = "\x1b[0m";
const GREEN = "\x1b[38;2;163;230;53m";

function colorArt(line: string): string {
  return `${GREEN}${line}${RESET}`;
}

export const socials = [
  { label: "Website", value: "https://pixelrick.is-a.dev" },
  { label: "GitHub", value: "https://github.com/Pixelrick420" },
  { label: "LeetCode", value: "https://leetcode.com/u/Pixelrick420/" },
];

export const aboutLines = [
  "I'm a CSE undergrad and I like programming.",
  "You can find out more by visiting my website.",
  "",
  "Location: Kerala, India",
];

function padRight(text: string, width: number): string {
  return text + " ".repeat(Math.max(0, width - text.length));
}

const line = "─".repeat(64);

const terminalRegex =
  /curl|wget|httpie|http-client|aria2|python-requests|okhttp|go-http-client|node-fetch|powershell/i;

export function isTerminalRequest(request: Request): boolean {
  const ua = request.headers.get("user-agent") ?? "";
  if (terminalRegex.test(ua)) return true;
  const accept = request.headers.get("accept") ?? "";
  return !accept.includes("text/html") && /curl|wget|httpie/i.test(ua);
}

export function renderHome(): string {
  const socialLines = socials.map(
    (s) => `${padRight(s.label, 10)} ${s.value}`,
  );

  return [
    "",
    ...asciiArt.map(colorArt),
    "",
    line,
    "",
    ...aboutLines,
    "",
    ...socialLines,
    "",
    line,
    "",
  ].join("\n");
}
