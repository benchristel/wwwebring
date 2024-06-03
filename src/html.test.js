import {test, expect, is} from "@benchristel/taste"
import {generateHtml, htmlEscape, view} from "./html.js"

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

test("view", {
  "url-encodes the 'previous' link href"() {
    const html = view({prevUrl: "http://foo.com/a b"})
    expect(html, contains, "http://foo.com/a%20b")
  },

  "url-encodes the 'next' link href"() {
    const html = view({nextUrl: "http://foo.com/a b"})
    expect(html, contains, "http://foo.com/a%20b")
  },

  "url-encodes the 'hub' link href"() {
    const html = view({hubUrl: "http://foo.com/a b"})
    expect(html, contains, "http://foo.com/a%20b")
  },

  "html-escapes the 'previous' link title"() {
    const html = view({prevTitle: "<wow>"})
    expect(html, contains, "&lt;wow&gt;")
  },

  "html-escapes the 'next' link title"() {
    const html = view({nextTitle: "<wow>"})
    expect(html, contains, "&lt;wow&gt;")
  },

  "html-escapes the 'hub' link title"() {
    const html = view({hubTitle: "<wow>"})
    expect(html, contains, "&lt;wow&gt;")
  },
})

test("htmlEscape", {
  "escapes special characters"() {
    expect(htmlEscape(`<>&'"<>&'"`), is, "&lt;&gt;&amp;&#39;&quot;&lt;&gt;&amp;&#39;&quot;")
  },
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

function contains(expectedSubstring, s) {
  return s.includes(expectedSubstring)
}