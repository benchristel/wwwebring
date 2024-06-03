import {urlEscape} from "./lib/urls.js"
import {htmlEscape} from "./lib/html.js"

export function generateHtml(config) {
  return view(model(config))
}

export function model(config) {
  return {
    prevUrl: config.hub,
    prevTitle: config.name,
    hubUrl: config.hub,
    hubTitle: config.name,
    nextUrl: config.hub,
    nextTitle: config.name,
  }
}

export function view(model) {
  return `
    <div class="wwwebring-widget">
      <div class="wwwebring-hub">
        <a href="${urlEscape(model.hubUrl)}">${htmlEscape(model.hubTitle)}</a>
      </div>
      <div class="wwwebring-ring-links">
        <span class="wwwebring-prev">
          <a href="${urlEscape(model.prevUrl)}">${htmlEscape(model.prevTitle)}</a>
        </span>
        <span class="wwwebring-divider"></span>
        <span class="wwwebring-next">
          <a href="${urlEscape(model.nextUrl)}">${htmlEscape(model.nextTitle)}</a>
        </span>
      </div>
    </div>
  `
}
