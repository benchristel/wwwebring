import {test, expect, equals} from "@benchristel/taste"
import {Ring} from "./ring.js"

const baseConfig = {
  "name": "Test ring",
  "configLocation": "https://hub.com/ring.json",
  "hub": "https://hub.com",
  "members": []
}

test("a webring with no members", {
  "points the 'prev' link to the hub"() {
    const ring = new Ring(baseConfig, "https://irrelevant.com")

    expect(ring.prevUrl, equals, "https://hub.com")
    expect(ring.prevTitle, equals, "Test ring")
  },

  "points the 'next' link to the hub"() {
    const ring = new Ring(baseConfig, "https://irrelevant.com")

    expect(ring.nextUrl, equals, "https://hub.com")
    expect(ring.nextTitle, equals, "Test ring")
  },

  "points the 'hub' link to the hub"() {
    const ring = new Ring(baseConfig, "https://irrelevant.com")

    expect(ring.hubUrl, equals, "https://hub.com")
    expect(ring.hubTitle, equals, "Test ring")
  },
})

const oneMemberConfig = {
  ...baseConfig,
  members: [
    {
      title: "First",
      landingPage: "https://first.one/dir/index.html",
      scope: "https://first.one",
    }
  ]
}

test("a ring with one member", {
  "points the 'prev' link on the hub page to that member"() {
    const ring = new Ring(oneMemberConfig, "https://hub.com")

    expect(ring.prevUrl, equals, "https://first.one/dir/index.html")
    expect(ring.prevTitle, equals, "First")
  },

  "points the 'next' link on the hub page to that member"() {
    const ring = new Ring(oneMemberConfig, "https://hub.com")

    expect(ring.nextUrl, equals, "https://first.one/dir/index.html")
    expect(ring.nextTitle, equals, "First")
  },

  "points the 'prev' link on the member page to itself"() {
    const ring = new Ring(oneMemberConfig, "https://first.one/dir/index.html")

    expect(ring.prevUrl, equals, "https://first.one/dir/index.html")
    expect(ring.prevTitle, equals, "First")
  },

  "points the 'next' link on the member page to itself"() {
    const ring = new Ring(oneMemberConfig, "https://first.one/dir/index.html")

    expect(ring.nextUrl, equals, "https://first.one/dir/index.html")
    expect(ring.nextTitle, equals, "First")
  },
})