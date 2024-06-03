import {onDomContentLoaded} from "./lib/browser.js"
import {generateHtml} from "./widget.js"

onDomContentLoaded(() => {
  const webringPlaceholders = [...document.querySelectorAll("[data-wwwebring]")]
  
  for (const placeholder of webringPlaceholders) {
    const configUrl = placeholder.getAttribute("data-wwwebring")
    fetch(configUrl)
      .then(r => r.json())
      .then(config => generateHtml(config, window.location.href))
      .then(html => placeholder.innerHTML = html)
      .catch(e => console.error("Failed to fetch webring config for URL " + configUrl, e.message))
  }
})
