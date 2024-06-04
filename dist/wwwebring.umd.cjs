(function(s){typeof define=="function"&&define.amd?define(s):s()})(function(){"use strict";function s(t){document.readyState!=="loading"?setTimeout(t,0):document.addEventListener("DOMContentLoaded",t)}function o(t){return String(t).replace(/[ "<>]/g,e=>"%"+e.charCodeAt(0).toString(16).toUpperCase())}function c(t){l(t)||(t="https://"+t);try{return new URL(t)}catch{return null}}function l(t){return/^[a-z]+:\/\//.test(t)}function a(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}class h{constructor(e){this.config=e}portalAt(e){return new g(this,e)}hub(){return{landingPage:this.config.hub,title:this.config.name}}numMembers(){return this.config.members.length}memberAt(e){if(this.numMembers()===0)return this.hub();const n=(e+this.numMembers())%this.numMembers();return this.config.members[n]}memberIndex(e){return this.config.members.findIndex(({landingPage:n})=>e.matches(n))}}class g{constructor(e,n){this.ring=e,this.location=n}get prevUrl(){return this.prev().landingPage}get prevTitle(){return this.prev().title}get hubUrl(){return this.hub().landingPage}get hubTitle(){return this.hub().title}get nextUrl(){return this.next().landingPage}get nextTitle(){return this.next().title}hub(){return this.ring.hub()}prev(){const e=this.ring.memberIndex(this.location);return e===-1?this.ring.memberAt(-1):this.ring.memberAt(e-1)}next(){const e=this.ring.memberIndex(this.location);return e===-1?this.ring.memberAt(0):this.ring.memberAt(e+1)}}class m{constructor(e){this.rawUrl=e}matches(e){if(this.url==null)return!1;const n=c(e);return n==null?!1:u(this.url)===u(n)}get url(){try{return this._url??(this._url=new URL(this.rawUrl))}catch{return null}}}function u(t){return t.hostname.replace(/^www\./,"")}class w{constructor(e,n){this.realUrl=e,this.hint=n}matches(e){return this.scopes.some(n=>n.matches(e))}get scopes(){return[this.realUrl,this.hint].filter(d).map(e=>new m(e))}}function d(t){return t!=null}function b(t,e,n){const i=new w(e,n);return f(new h(t).portalAt(i))}function f(t){return`
    <div class="wwwebring-widget">
      <div class="wwwebring-hub">
        <a href="${o(t.hubUrl)}">${a(t.hubTitle)}</a>
      </div>
      <div class="wwwebring-ring-links">
        <span class="wwwebring-prev">
          <a href="${o(t.prevUrl)}">${a(t.prevTitle)}</a>
        </span>
        <span class="wwwebring-divider"></span>
        <span class="wwwebring-next">
          <a href="${o(t.nextUrl)}">${a(t.nextTitle)}</a>
        </span>
      </div>
    </div>
  `}s(()=>{const t=[...document.querySelectorAll("[data-wwwebring]")];for(const e of t){const n=e.getAttribute("data-wwwebring-you-are-here"),i=e.getAttribute("data-wwwebring");if(!i){console.error("data-wwwebring attribute was empty; it should be a URL");continue}fetch(i).then(r=>r.json()).then(r=>b(r,window.location.href,n)).then(r=>e.innerHTML=r).catch(r=>console.error("Failed to fetch webring config for URL "+i,r.message))}})});
