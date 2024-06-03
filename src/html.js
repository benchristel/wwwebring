import {urlEscape} from "./urls.js"

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
      <div class="wwwebring-start">
        <a href="${urlEscape(model.prevUrl)}">${model.prevTitle}</a>
      </div>
      <div class="wwwebring-middle">
        <a href="${urlEscape(model.hubUrl)}">${model.hubTitle}</a>
      </div>
      <div class="wwwebring-end">
        <a href="${urlEscape(model.nextUrl)}">${model.nextTitle}</a>
      </div>
    </div>
  `
}