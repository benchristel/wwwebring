(function(t){typeof define=="function"&&define.amd?define(t):t()})(function(){"use strict";function t(e){document.readyState!=="loading"?setTimeout(e,0):document.addEventListener("DOMContentLoaded",e)}function a(e){return String(e).replace(/[ "<>]/g,r=>"%"+r.charCodeAt(0).toString(16).toUpperCase())}function i(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function s(e){return o(c(e))}function c(e){return{prevUrl:e.hub,prevTitle:e.name,hubUrl:e.hub,hubTitle:e.name,nextUrl:e.hub,nextTitle:e.name}}function o(e){return`
    <div class="wwwebring-widget">
      <div class="wwwebring-hub">
        <a href="${a(e.hubUrl)}">${i(e.hubTitle)}</a>
      </div>
      <div class="wwwebring-ring-links">
        <span class="wwwebring-prev">
          <a href="${a(e.prevUrl)}">${i(e.prevTitle)}</a>
        </span>
        <span class="wwwebring-divider"></span>
        <span class="wwwebring-next">
          <a href="${a(e.nextUrl)}">${i(e.nextTitle)}</a>
        </span>
      </div>
    </div>
  `}t(()=>{const e=[...document.querySelectorAll("[data-wwwebring]")];for(const r of e){const l=r.getAttribute("data-wwwebring");fetch(l).then(n=>n.json()).then(n=>s(n)).then(n=>r.innerHTML=n).catch(n=>console.error("Failed to fetch webring config for URL "+l,n.message))}})});
