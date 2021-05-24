export function filterRichtext(html) {
  return html
    .replace(/(\n)/g, "")
    .replace(/(\t)/g, "")
    .replace(/(\r)/g, "")
    .replace(/<\/?[^>]*>/g, "")
    .replace(/\s*/g, "")
}