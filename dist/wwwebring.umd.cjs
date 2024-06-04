(function(i){typeof define=="function"&&define.amd?define(i):i()})(function(){"use strict";function i(t){document.readyState!=="loading"?setTimeout(t,0):document.addEventListener("DOMContentLoaded",t)}function s(t){return String(t).replace(/[ "<>]/g,e=>"%"+e.charCodeAt(0).toString(16).toUpperCase())}function u(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}class c{constructor(e){this.config=e}portalAt(e){return new a(this,e)}hub(){return{landingPage:this.config.hub,scope:this.config.hub,title:this.config.name}}numMembers(){return this.config.members.length}memberAt(e){if(this.numMembers()===0)return this.hub();const n=(e+this.numMembers())%this.numMembers();return this.config.members[n]}memberIndex(e){return this.config.members.findIndex(({landingPage:n})=>n===e)}}class a{constructor(e,n){this.ring=e,this.currentUrl=n}get prevUrl(){return this.prev().landingPage}get prevTitle(){return this.prev().title}get hubUrl(){return this.hub().landingPage}get hubTitle(){return this.hub().title}get nextUrl(){return this.next().landingPage}get nextTitle(){return this.next().title}hub(){return this.ring.hub()}prev(){const e=this.ring.memberIndex(this.currentUrl);return e===-1?this.ring.memberAt(-1):this.ring.memberAt(e-1)}next(){const e=this.ring.memberIndex(this.currentUrl);return e===-1?this.ring.memberAt(0):this.ring.memberAt(e+1)}}function g(t,e){return o(new c(t).portalAt(e))}function o(t){return`
    <div class="wwwebring-widget">
      <div class="wwwebring-hub">
        <a href="${s(t.hubUrl)}">${u(t.hubTitle)}</a>
      </div>
      <div class="wwwebring-ring-links">
        <span class="wwwebring-prev">
          <a href="${s(t.prevUrl)}">${u(t.prevTitle)}</a>
        </span>
        <span class="wwwebring-divider"></span>
        <span class="wwwebring-next">
          <a href="${s(t.nextUrl)}">${u(t.nextTitle)}</a>
        </span>
      </div>
    </div>
  `}i(()=>{const t=[...document.querySelectorAll("[data-wwwebring]")];for(const e of t){const n=e.getAttribute("data-wwwebring");if(!n){console.error("data-wwwebring attribute was empty; it should be a URL");continue}fetch(n).then(r=>r.json()).then(r=>g(r,window.location.href)).then(r=>e.innerHTML=r).catch(r=>console.error("Failed to fetch webring config for URL "+n,r.message))}})});
