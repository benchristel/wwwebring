import {test, expect} from "@benchristel/taste"
import {generateHtml} from "./html.js"

test("the webring html", {
  "points all links to the hub when there are no sites in the webring"() {
    const config = {
      "name": "Test ring",
      "configLocation": "https://example.com/ring.json",
      "hub": "https://example.com",
      "members": []
    }

    const expected = `
      <div class="wwwebring-widget">
        <div class="wwwebring-start">
          <a href="https://example.com">Test ring</a>
        </div>
        <div class="wwwebring-middle">
          <a href="https://example.com">Test ring</a>
        </div>
        <div class="wwwebring-end">
          <a href="https://example.com">Test ring</a>
        </div>
      </div>
    `

    const html = generateHtml(config, "https://irrelevant.com")

    expect(html, isDisregardingSpaces, expected)
  }
})

function isDisregardingSpaces(rawExpected, rawActual) {
  if (typeof rawExpected !== "string") return false;
  if (typeof rawActual !== "string") return false;

  const expected = stripSpacesFromHTML(rawExpected)
  const actual = stripSpacesFromHTML(rawActual)

  return expected === actual
}

function stripSpacesFromHTML(html) {
  return html.replace(/\s+/g, " ").replace(/ ?([<>]) ?/g, "$1")
}