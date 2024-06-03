function l(e) {
  document.readyState !== "loading" ? setTimeout(e, 0) : document.addEventListener("DOMContentLoaded", e);
}
function r(e) {
  return String(e).replace(/[ "<>]/g, (t) => "%" + t.charCodeAt(0).toString(16).toUpperCase());
}
function a(e) {
  return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function s(e) {
  return o(c(e));
}
function c(e) {
  return {
    prevUrl: e.hub,
    prevTitle: e.name,
    hubUrl: e.hub,
    hubTitle: e.name,
    nextUrl: e.hub,
    nextTitle: e.name
  };
}
function o(e) {
  return `
    <div class="wwwebring-widget">
      <div class="wwwebring-hub">
        <a href="${r(e.hubUrl)}">${a(e.hubTitle)}</a>
      </div>
      <div class="wwwebring-ring-links">
        <span class="wwwebring-prev">
          <a href="${r(e.prevUrl)}">${a(e.prevTitle)}</a>
        </span>
        <span class="wwwebring-divider"></span>
        <span class="wwwebring-next">
          <a href="${r(e.nextUrl)}">${a(e.nextTitle)}</a>
        </span>
      </div>
    </div>
  `;
}
l(() => {
  const e = [...document.querySelectorAll("[data-wwwebring]")];
  for (const t of e) {
    const i = t.getAttribute("data-wwwebring");
    fetch(i).then((n) => n.json()).then((n) => s(n)).then((n) => t.innerHTML = n).catch((n) => console.error("Failed to fetch webring config for URL " + i, n.message));
  }
});
