import { next } from "@vercel/functions";
import { isTerminalRequest, renderHome } from "./terminal.js";

export default function middleware(request: Request) {
  const { pathname } = new URL(request.url);
  const terminal = isTerminalRequest(request);

  if (!terminal) {
    return next();
  }

  if (pathname === "/" || pathname === "" || pathname.endsWith("index.html")) {
    return new Response(renderHome(), {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  return next();
}

export const config = {
  matcher: ["/", "/index.html"],
  runtime: "nodejs",
};
