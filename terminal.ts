const asciiArt = [
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

const stuff = [
  { label: "Location", value: "Kerala, India" },
  { label: "Website", value: "https://pixelrick.is-a.dev" },
  { label: "GitHub", value: "https://github.com/Pixelrick420" },
  { label: "LeetCode", value: "https://leetcode.com/u/Pixelrick420/" },
];

const aboutLines = [
  "I'm a CSE undergrad and I like programming.",
  "You can find out more by visiting my website.",
];

function padRight(text: string, width: number): string {
  return text + " ".repeat(Math.max(0, width - text.length));
}

const line = "─".repeat(64);

const terminalRegex =
  /curl|wget|httpie|http-client|aria2|python-requests|okhttp|go-http-client|node-fetch|powershell/i;

export function isTerminalRequest(request: Request): boolean {
  return terminalRegex.test(request.headers.get("user-agent") ?? "");
}

export function renderHome(): string {
  const socialLines = stuff.map((s) => `${padRight(s.label, 10)} ${s.value}`);

  return [
    line,
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
