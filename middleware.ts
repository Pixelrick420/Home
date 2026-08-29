import { next } from "@vercel/functions";
import { isTerminalRequest, renderHome } from "./terminal.js";
import {
  agentSkillsIndex,
  aiCatalog,
  linkHeader,
  renderMarkdownHome,
} from "./agent.js";

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "public, max-age=3600",
};

const HOMEPAGE_HEADERS = {
  "Cache-Control": "public, max-age=3600",
  Link: linkHeader,
};

function wantsMarkdown(request: Request): boolean {
  const accept = request.headers.get("accept") ?? "";
  return /(?:^|,)\s*text\/markdown(?:\s*;|,|$)/i.test(accept);
}

function jsonResponse(
  body: unknown,
  init: ResponseInit = {},
): Response {
  return new Response(JSON.stringify(body, null, 2), {
    status: 200,
    headers: { ...JSON_HEADERS, ...init.headers },
  });
}

export default function middleware(request: Request) {
  const { pathname } = new URL(request.url);

  if (pathname === "/.well-known/ai-catalog.json") {
    return jsonResponse(aiCatalog);
  }

  if (pathname === "/.well-known/agent-skills/index.json") {
    return jsonResponse(agentSkillsIndex);
  }

  if (pathname === "/" || pathname === "" || pathname.endsWith("index.html")) {
    if (wantsMarkdown(request)) {
      const markdown = renderMarkdownHome();
      return new Response(markdown, {
        status: 200,
        headers: {
          ...HOMEPAGE_HEADERS,
          "Content-Type": "text/markdown; charset=utf-8",
          "x-markdown-tokens": String(Math.ceil(markdown.length / 4)),
        },
      });
    }

    if (isTerminalRequest(request)) {
      return new Response(renderHome(), {
        status: 200,
        headers: {
          ...HOMEPAGE_HEADERS,
          "Content-Type": "text/plain; charset=utf-8",
        },
      });
    }

    return next({ headers: { Link: linkHeader } });
  }

  return next();
}

export const config = {
  matcher: ["/", "/index.html", "/.well-known/:path*"],
  runtime: "nodejs",
};