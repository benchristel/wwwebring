import {test, expect, equals} from "@benchristel/taste"
import {Ring} from "./ring.js"

const baseConfig = {
  "name": "Test ring",
  "configLocation": "https://example.com/ring.json",
  "hub": "https://example.com",
  "members": []
}

test("a webring with no members", {
  "points the 'prev' link to the hub"() {
    const ring = new Ring(baseConfig, "https://irrelevant.com")

    expect(ring.prevUrl, equals, "https://example.com")
    expect(ring.prevTitle, equals, "Test ring")
  },

  "points the 'next' link to the hub"() {
    const ring = new Ring(baseConfig, "https://irrelevant.com")

    expect(ring.nextUrl, equals, "https://example.com")
    expect(ring.nextTitle, equals, "Test ring")
  },

  "points the 'hub' link to the hub"() {
    const ring = new Ring(baseConfig, "https://irrelevant.com")

    expect(ring.hubUrl, equals, "https://example.com")
    expect(ring.hubTitle, equals, "Test ring")
  },
})
