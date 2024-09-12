function l(t) {
  const e = `[data-wwwebring="${t}"]`;
  return `
${e} .wwwebring-widget {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  border: var(--wwwebring-border, none);
  background: var(--wwwebring-background, transparent);
  padding-block: 0.5em;
  text-align: center;
}

${e} .wwwebring-widget a {
  display: inline-block;
  padding: 0.75em;
  font-weight: bold;
  color: var(--wwwebring-text-color, inherit);
}

${e} .wwwebring-ring-links {
  display: flex;
  align-items: center;
  justify-content: center;
}

${e} .wwwebring-prev, .wwwebring-next {
  flex-grow: 1;
  display: flex;
  align-items: center;
}

${e} .wwwebring-prev {
  justify-content: flex-end;
}

${e} .wwwebring-next {
  justify-content: flex-start;
}

${e} .wwwebring-prev > a::before {
  content: '<<';
  padding-inline-end: 1em;
}

${e} .wwwebring-next > a::after {
  content: '>>';
  padding-inline-start: 1em;
}

${e} .wwwebring-divider {
  padding-inline: 0.5em;
}
`;
}
function c(t) {
  document.readyState !== "loading" ? setTimeout(t, 0) : document.addEventListener("DOMContentLoaded", t);
}
function u(t) {
  const e = document.createElement("style");
  document.head.appendChild(e), e.innerText = t;
}
function s(t) {
  return t != null && t.match(/https?:\/\//) ? t.replace(/[ "<>]/g, (e) => "%" + e.charCodeAt(0).toString(16).toUpperCase()) : "#";
}
function w(t) {
  h(t) || (t = "https://" + t);
  try {
    return new URL(t);
  } catch {
    return null;
  }
}
function h(t) {
  return /^[a-z]+:\/\//.test(t);
}
function a(t) {
  return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
class g {
  constructor(e) {
    this.config = e;
  }
  portalAt(e) {
    return new d(this, e);
  }
  *sites() {
    const e = this.hub();
    yield { name: e.name, url: e.url };
    for (let n = 0; n < this.numMembers(); n++)
      yield this.memberAt(n);
  }
  hub() {
    return this.config;
  }
  numMembers() {
    return this.config.members.length;
  }
  memberAt(e) {
    if (this.numMembers() === 0)
      return this.hub();
    const n = (e + this.numMembers()) % this.numMembers();
    return this.config.members[n];
  }
  // memberIndex returns -1 on not found
  memberIndex(e) {
    return this.config.members.findIndex(
      ({ url: n }) => e.matches(n)
    );
  }
}
class d {
  constructor(e, n) {
    this.ring = e, this.location = n;
  }
  get prevUrl() {
    return this.prev().url;
  }
  get prevTitle() {
    return this.prev().name;
  }
  get hubUrl() {
    return this.hub().url;
  }
  get hubTitle() {
    return this.hub().name;
  }
  get nextUrl() {
    return this.next().url;
  }
  get nextTitle() {
    return this.next().name;
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
    const n = w(e);
    return n == null ? !1 : o(this.url) === o(n);
  }
  get url() {
    try {
      return this._url ?? (this._url = new URL(this.rawUrl));
    } catch {
      return null;
    }
  }
}
function o(t) {
  return t.hostname.replace(/^www\./, "");
}
class b {
  constructor(e, n) {
    this.realUrl = e, this.hint = n;
  }
  matches(e) {
    return this.scopes.some((n) => n.matches(e));
  }
  get scopes() {
    return [this.realUrl, this.hint].filter(f).map((e) => new m(e));
  }
}
function f(t) {
  return t != null;
}
function p(t, e, n) {
  const i = new b(e, n);
  return x(new g(t).portalAt(i));
}
function x(t) {
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
c(() => {
  const t = [...document.querySelectorAll("[data-wwwebring]")];
  for (const e of t) {
    const n = e.getAttribute("data-wwwebring-you-are-here"), i = e.getAttribute("data-wwwebring");
    if (!i) {
      console.error("data-wwwebring attribute was empty; it should be a URL");
      continue;
    }
    switch (fetch(i).then((r) => r.json()).then((r) => p(r, window.location.href, n)).then((r) => e.innerHTML = r).catch((r) => console.error("Failed to fetch webring config for URL " + i, r.message)), e.getAttribute("data-wwwebring-theme")) {
      case "default":
        u(l(i));
        break;
    }
  }
});
