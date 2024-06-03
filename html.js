export function generateHtml(config) {
  return `
    <div class="wwwebring-widget">
      <div class="wwwebring-start">
        <a href="${config.hub}">${config.name}</a>
      </div>
      <div class="wwwebring-middle">
        <a href="${config.hub}">${config.name}</a>
      </div>
      <div class="wwwebring-end">
        <a href="${config.hub}">${config.name}</a>
      </div>
    </div>
  `
}