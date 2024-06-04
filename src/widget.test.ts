import {test, expect} from "@benchristel/taste"
import {contains} from "./lib/testing"
import {generateHtml, view} from "./widget"

test("the webring html", {
  "generates even when there are no sites in the webring"() {
    const config = {
      "name": "Test ring",
      "configLocation": "https://example.com/ring.json",
      "hub": "https://example.com",
      "members": []
    }

    const html = generateHtml(config, "https://irrelevant.com", null)

    expect(html, contains, `<a href="https://example.com">Test ring</a>`)
  }
})

test("view", {
  "url-encodes the 'previous' link href"() {
    const html = view({prevUrl: "http://foo.com/a b"} as any)
    expect(html, contains, "http://foo.com/a%20b")
  },

  "url-encodes the 'next' link href"() {
    const html = view({nextUrl: "http://foo.com/a b"} as any)
    expect(html, contains, "http://foo.com/a%20b")
  },

  "url-encodes the 'hub' link href"() {
    const html = view({hubUrl: "http://foo.com/a b"} as any)
    expect(html, contains, "http://foo.com/a%20b")
  },

  "html-escapes the 'previous' link title"() {
    const html = view({prevTitle: "<wow>"} as any)
    expect(html, contains, "&lt;wow&gt;")
  },

  "html-escapes the 'next' link title"() {
    const html = view({nextTitle: "<wow>"} as any)
    expect(html, contains, "&lt;wow&gt;")
  },

  "html-escapes the 'hub' link title"() {
    const html = view({hubTitle: "<wow>"} as any)
    expect(html, contains, "&lt;wow&gt;")
  },
})

