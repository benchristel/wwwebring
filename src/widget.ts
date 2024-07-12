import {sanitizeUrl} from "./lib/urls"
import {htmlEscape} from "./lib/html"
import {Ring, type Portal} from "./domain/ring"
import type {Config} from "./domain/config"
import {PortalLocation} from "./domain/portal-location"

export function generateHtml(
  config: Config,
  currentUrl: string,
  urlHint: null | string,
) {
  const location = new PortalLocation(currentUrl, urlHint)
  return view(new Ring(config).portalAt(location))
}

export function view(portal: Portal) {
  return `
    <div class="wwwebring-widget">
      <div class="wwwebring-hub">
        <a href="${sanitizeUrl(portal.hubUrl)}">${htmlEscape(portal.hubTitle)}</a>
      </div>
      <div class="wwwebring-ring-links">
        <span class="wwwebring-prev">
          <a href="${sanitizeUrl(portal.prevUrl)}">${htmlEscape(portal.prevTitle)}</a>
        </span>
        <span class="wwwebring-divider"></span>
        <span class="wwwebring-next">
          <a href="${sanitizeUrl(portal.nextUrl)}">${htmlEscape(portal.nextTitle)}</a>
        </span>
      </div>
    </div>
  `
}
