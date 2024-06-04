function u(t) {
  document.readyState !== "loading" ? setTimeout(t, 0) : document.addEventListener("DOMContentLoaded", t);
}
function i(t) {
  return String(t).replace(/[ "<>]/g, (e) => "%" + e.charCodeAt(0).toString(16).toUpperCase());
}
function s(t) {
  return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
class a {
  constructor(e) {
    this.config = e;
  }
  portalAt(e) {
    return new c(this, e);
  }
  hub() {
    return {
      landingPage: this.config.hub,
      scope: this.config.hub,
      title: this.config.name
    };
  }
  numMembers() {
    return this.config.members.length;
  }
  memberAt(e) {
    if (this.numMembers() === 0)
      return this.hub();
    const r = (e + this.numMembers()) % this.numMembers();
    return this.config.members[r];
  }
  // memberIndex returns -1 on not found
  memberIndex(e) {
    return this.config.members.findIndex(
      ({ landingPage: r }) => r === e
    );
  }
}
class c {
  constructor(e, r) {
    this.ring = e, this.currentUrl = r;
  }
  get prevUrl() {
    return this.prev().landingPage;
  }
  get prevTitle() {
    return this.prev().title;
  }
  get hubUrl() {
    return this.hub().landingPage;
  }
  get hubTitle() {
    return this.hub().title;
  }
  get nextUrl() {
    return this.next().landingPage;
  }
  get nextTitle() {
    return this.next().title;
  }
  hub() {
    return this.ring.hub();
  }
  prev() {
    const e = this.ring.memberIndex(this.currentUrl);
    return e === -1 ? this.ring.memberAt(-1) : this.ring.memberAt(e - 1);
  }
  next() {
    const e = this.ring.memberIndex(this.currentUrl);
    return e === -1 ? this.ring.memberAt(0) : this.ring.memberAt(e + 1);
  }
}
function g(t, e) {
  return h(new a(t).portalAt(e));
}
function h(t) {
  return `
    <div class="wwwebring-widget">
      <div class="wwwebring-hub">
        <a href="${i(t.hubUrl)}">${s(t.hubTitle)}</a>
      </div>
      <div class="wwwebring-ring-links">
        <span class="wwwebring-prev">
          <a href="${i(t.prevUrl)}">${s(t.prevTitle)}</a>
        </span>
        <span class="wwwebring-divider"></span>
        <span class="wwwebring-next">
          <a href="${i(t.nextUrl)}">${s(t.nextTitle)}</a>
        </span>
      </div>
    </div>
  `;
}
u(() => {
  const t = [...document.querySelectorAll("[data-wwwebring]")];
  for (const e of t) {
    const r = e.getAttribute("data-wwwebring");
    if (!r) {
      console.error("data-wwwebring attribute was empty; it should be a URL");
      continue;
    }
    fetch(r).then((n) => n.json()).then((n) => g(n, window.location.href)).then((n) => e.innerHTML = n).catch((n) => console.error("Failed to fetch webring config for URL " + r, n.message));
  }
});
