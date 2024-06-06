(function(s){typeof define=="function"&&define.amd?define(s):s()})(function(){"use strict";function s(t){const e=`[data-wwwebring="${t}"]`;return`
${e} .wwwebring-widget {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  border: 2px outset #dcd;
  background: #f6f0ff;
  color: #000;
  padding-block: 0.5em;
  text-align: center;
}

${e} .wwwebring-widget a {
  display: inline-block;
  padding: 0.75em;
  font-weight: bold;
  color: inherit;
  text-decoration: 1px underline #777;
}

${e} .wwwebring-widget a:hover {
  background: #fff5;
}

${e} .wwwebring-ring-links {
  display: flex;
  align-items: center;
}

${e} .wwwebring-prev, .wwwebring-next {
  flex-basis: 10em;
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

${e} .wwwebring-divider::before {
  content: '\\2766';
  padding-inline: 1em;
}
`}function c(t){document.readyState!=="loading"?setTimeout(t,0):document.addEventListener("DOMContentLoaded",t)}function u(t){const e=document.createElement("style");document.head.appendChild(e),e.innerText=t}function a(t){return String(t).replace(/[ "<>]/g,e=>"%"+e.charCodeAt(0).toString(16).toUpperCase())}function g(t){w(t)||(t="https://"+t);try{return new URL(t)}catch{return null}}function w(t){return/^[a-z]+:\/\//.test(t)}function o(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}class d{constructor(e){this.config=e}portalAt(e){return new h(this,e)}hub(){return{landingPage:this.config.hub,title:this.config.name}}numMembers(){return this.config.members.length}memberAt(e){if(this.numMembers()===0)return this.hub();const n=(e+this.numMembers())%this.numMembers();return this.config.members[n]}memberIndex(e){return this.config.members.findIndex(({landingPage:n})=>e.matches(n))}}class h{constructor(e,n){this.ring=e,this.location=n}get prevUrl(){return this.prev().landingPage}get prevTitle(){return this.prev().title}get hubUrl(){return this.hub().landingPage}get hubTitle(){return this.hub().title}get nextUrl(){return this.next().landingPage}get nextTitle(){return this.next().title}hub(){return this.ring.hub()}prev(){const e=this.ring.memberIndex(this.location);return e===-1?this.ring.memberAt(-1):this.ring.memberAt(e-1)}next(){const e=this.ring.memberIndex(this.location);return e===-1?this.ring.memberAt(0):this.ring.memberAt(e+1)}}class f{constructor(e){this.rawUrl=e}matches(e){if(this.url==null)return!1;const n=g(e);return n==null?!1:l(this.url)===l(n)}get url(){try{return this._url??(this._url=new URL(this.rawUrl))}catch{return null}}}function l(t){return t.hostname.replace(/^www\./,"")}class b{constructor(e,n){this.realUrl=e,this.hint=n}matches(e){return this.scopes.some(n=>n.matches(e))}get scopes(){return[this.realUrl,this.hint].filter(m).map(e=>new f(e))}}function m(t){return t!=null}function p(t,e,n){const i=new b(e,n);return x(new d(t).portalAt(i))}function x(t){return`
    <div class="wwwebring-widget">
      <div class="wwwebring-hub">
        <a href="${a(t.hubUrl)}">${o(t.hubTitle)}</a>
      </div>
      <div class="wwwebring-ring-links">
        <span class="wwwebring-prev">
          <a href="${a(t.prevUrl)}">${o(t.prevTitle)}</a>
        </span>
        <span class="wwwebring-divider"></span>
        <span class="wwwebring-next">
          <a href="${a(t.nextUrl)}">${o(t.nextTitle)}</a>
        </span>
      </div>
    </div>
  `}c(()=>{const t=[...document.querySelectorAll("[data-wwwebring]")];for(const e of t){const n=e.getAttribute("data-wwwebring-you-are-here"),i=e.getAttribute("data-wwwebring");if(!i){console.error("data-wwwebring attribute was empty; it should be a URL");continue}switch(fetch(i).then(r=>r.json()).then(r=>p(r,window.location.href,n)).then(r=>e.innerHTML=r).catch(r=>console.error("Failed to fetch webring config for URL "+i,r.message)),e.getAttribute("data-wwwebring-theme")){case"default":u(s(i));break}}})});
