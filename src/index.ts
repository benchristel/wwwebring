import {onDomContentLoaded} from "./lib/browser"
import {generateHtml} from "./widget"

onDomContentLoaded(() => {
  const webringPlaceholders = [...document.querySelectorAll("[data-wwwebring]")]
  
  for (const placeholder of webringPlaceholders) {
    const hint = placeholder.getAttribute("data-wwwebring-you-are-here")
    const configUrl = placeholder.getAttribute("data-wwwebring")
    if (!configUrl) {
      console.error("data-wwwebring attribute was empty; it should be a URL")
      continue;
    }
    
    fetch(configUrl)
      .then(r => r.json())
      .then(config => generateHtml(config, window.location.href, hint))
      .then(html => placeholder.innerHTML = html)
      .catch(e => console.error("Failed to fetch webring config for URL " + configUrl, e.message))
  }
})
