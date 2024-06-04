import {urlEscape} from "./lib/urls"
import {htmlEscape} from "./lib/html"
import {Ring, type Portal} from "./domain/ring"
import type {Config} from "./domain/config"

export function generateHtml(config: Config, currentUrl: string) {
  return view(new Ring(config).portalAt(currentUrl))
}

export function view(portal: Portal) {
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
