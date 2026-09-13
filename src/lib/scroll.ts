export function scrollToId(selector: string) {
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
}