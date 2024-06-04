import {urlEscape} from "./lib/urls.js"
import {htmlEscape} from "./lib/html.js"
import {Ring} from "./domain/ring.js"

export function generateHtml(config, currentUrl) {
  return view(new Ring(config).portalAt(currentUrl))
}

export function view(portal) {
  return `
    <div class="wwwebring-widget">
      <div class="wwwebring-hub">
        <a href="${urlEscape(portal.hubUrl)}">${htmlEscape(portal.hubTitle)}</a>
      </div>
      <div class="wwwebring-ring-links">
        <span class="wwwebring-prev">
          <a href="${urlEscape(portal.prevUrl)}">${htmlEscape(portal.prevTitle)}</a>
        </span>
        <span class="wwwebring-divider"></span>
        <span class="wwwebring-next">
          <a href="${urlEscape(portal.nextUrl)}">${htmlEscape(portal.nextTitle)}</a>
        </span>
      </div>
    </div>
  `
}
