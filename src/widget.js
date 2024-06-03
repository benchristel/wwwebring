import {urlEscape} from "./lib/urls.js"
import {htmlEscape} from "./lib/html.js"
import {Ring} from "./domain/ring.js"

export function generateHtml(config) {
  return view(new Ring(config))
}

export function view(ring) {
  return `
    <div class="wwwebring-widget">
      <div class="wwwebring-hub">
        <a href="${urlEscape(ring.hubUrl)}">${htmlEscape(ring.hubTitle)}</a>
      </div>
      <div class="wwwebring-ring-links">
        <span class="wwwebring-prev">
          <a href="${urlEscape(ring.prevUrl)}">${htmlEscape(ring.prevTitle)}</a>
        </span>
        <span class="wwwebring-divider"></span>
        <span class="wwwebring-next">
          <a href="${urlEscape(ring.nextUrl)}">${htmlEscape(ring.nextTitle)}</a>
        </span>
      </div>
    </div>
  `
}
