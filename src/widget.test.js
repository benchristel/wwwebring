import {test, expect, equals} from "@benchristel/taste"
import {contains} from "./lib/testing.js"
import {generateHtml, view, model} from "./widget.js"

test("the webring html", {
  "generates even when there are no sites in the webring"() {
    const config = {
      "name": "Test ring",
      "configLocation": "https://example.com/ring.json",
      "hub": "https://example.com",
      "members": []
    }

    const html = generateHtml(config, "https://irrelevant.com")

    expect(html, contains, `<a href="https://example.com">Test ring</a>`)
  }
})

test("model", {
  "points all links to the hub when the webring has no members"() {
    const config = {
      "name": "Test ring",
      "configLocation": "https://example.com/ring.json",
      "hub": "https://example.com",
      "members": []
    }

    const theModel = model(config, "https://irrelevant.com")

    expect(theModel, equals, {
      prevUrl: "https://example.com",
      prevTitle: "Test ring",
      hubUrl: "https://example.com",
      hubTitle: "Test ring",
      nextUrl: "https://example.com",
      nextTitle: "Test ring"
    })
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

