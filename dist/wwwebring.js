function o(t) {
  document.readyState !== "loading" ? setTimeout(t, 0) : document.addEventListener("DOMContentLoaded", t);
}
function s(t) {
  return String(t).replace(/[ "<>]/g, (e) => "%" + e.charCodeAt(0).toString(16).toUpperCase());
}
function c(t) {
  u(t) || (t = "https://" + t);
  try {
    return new URL(t);
  } catch {
    return null;
  }
}
function u(t) {
  return /^[a-z]+:\/\//.test(t);
}
function a(t) {
  return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
class h {
  constructor(e) {
    this.config = e;
  }
  portalAt(e) {
    return new g(this, e);
  }
  hub() {
    return {
      landingPage: this.config.hub,
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
      ({ landingPage: r }) => e.matches(r)
    );
  }
}
class g {
  constructor(e, r) {
    this.ring = e, this.location = r;
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
    const e = this.ring.memberIndex(this.location);
    return e === -1 ? this.ring.memberAt(-1) : this.ring.memberAt(e - 1);
  }
  next() {
    const e = this.ring.memberIndex(this.location);
    return e === -1 ? this.ring.memberAt(0) : this.ring.memberAt(e + 1);
  }
}
class m {
  constructor(e) {
    this.rawUrl = e;
  }
  matches(e) {
    if (this.url == null)
      return !1;
    const r = c(e);
    return r == null ? !1 : l(this.url) === l(r);
  }
  get url() {
    try {
      return this._url ?? (this._url = new URL(this.rawUrl));
    } catch {
      return null;
    }
  }
}
function l(t) {
  return t.hostname.replace(/^www\./, "");
}
class w {
  constructor(e, r) {
    this.realUrl = e, this.hint = r;
  }
  matches(e) {
    return this.scopes.some((r) => r.matches(e));
  }
  get scopes() {
    return [this.realUrl, this.hint].filter(b).map((e) => new m(e));
  }
}
function b(t) {
  return t != null;
}
function d(t, e, r) {
  const i = new w(e, r);
  return f(new h(t).portalAt(i));
}
function f(t) {
  return `
    <div class="wwwebring-widget">
      <div class="wwwebring-hub">
        <a href="${s(t.hubUrl)}">${a(t.hubTitle)}</a>
      </div>
      <div class="wwwebring-ring-links">
        <span class="wwwebring-prev">
          <a href="${s(t.prevUrl)}">${a(t.prevTitle)}</a>
        </span>
        <span class="wwwebring-divider"></span>
        <span class="wwwebring-next">
          <a href="${s(t.nextUrl)}">${a(t.nextTitle)}</a>
        </span>
      </div>
    </div>
  `;
}
o(() => {
  const t = [...document.querySelectorAll("[data-wwwebring]")];
  for (const e of t) {
    const r = e.getAttribute("data-wwwebring-you-are-here"), i = e.getAttribute("data-wwwebring");
    if (!i) {
      console.error("data-wwwebring attribute was empty; it should be a URL");
      continue;
    }
    fetch(i).then((n) => n.json()).then((n) => d(n, window.location.href, r)).then((n) => e.innerHTML = n).catch((n) => console.error("Failed to fetch webring config for URL " + i, n.message));
  }
});
