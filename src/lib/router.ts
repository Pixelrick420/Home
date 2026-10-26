import { useEffect, useSyncExternalStore } from "react";
import type { MouseEvent } from "react";

export const PROJECTS_PATH = "/projects";

const NAVIGATE_EVENT = "app:navigate";

export function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(NAVIGATE_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(NAVIGATE_EVENT, onChange);
  };
}

export function usePath(): string {
  return useSyncExternalStore(
    subscribe,
    () => normalizePath(window.location.pathname),
    () => "/",
  );
}

function whenReady(step: () => boolean, budgetMs = 2500) {
  const start = performance.now();
  const tick = () => {
    if (step() || performance.now() - start > budgetMs) return;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function scrollToHash(hash: string) {
  let id = hash.slice(1);
  try {
    id = decodeURIComponent(id);
  } catch {
    // Malformed escape sequence: fall back to the raw fragment.
  }
  whenReady(() => {
    const el = document.getElementById(id);
    if (!el) return false;
    el.scrollIntoView({ behavior: "instant" });
    return true;
  });
}

function restoreScroll(top: number) {
  whenReady(() => {
    const maxTop = document.documentElement.scrollHeight - window.innerHeight;
    if (maxTop < top - 1) return false;
    window.scrollTo({ top, behavior: "instant" });
    return true;
  });
}

export function navigate(to: string) {
  const url = new URL(to, window.location.href);
  if (url.origin !== window.location.origin) {
    window.location.assign(url.href);
    return;
  }

  if (url.href !== window.location.href) {
    history.replaceState(
      { ...(history.state ?? {}), scrollY: window.scrollY },
      "",
    );
    history.pushState({}, "", url.pathname + url.search + url.hash);
    window.dispatchEvent(new Event(NAVIGATE_EVENT));
  }

  if (url.hash) scrollToHash(url.hash);
  else window.scrollTo({ top: 0, behavior: "instant" });
}

export function handleLinkClick(e: MouseEvent<HTMLAnchorElement>, to: string) {
  if (e.defaultPrevented || e.button !== 0) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  navigate(to);
}

export function useRouterScroll() {
  useEffect(() => {
    const onPop = (e: PopStateEvent) => {
      const saved: unknown = e.state?.scrollY;
      if (typeof saved === "number") restoreScroll(saved);
      else if (window.location.hash) scrollToHash(window.location.hash);
      else window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
}
