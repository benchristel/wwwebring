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
    const portal = new Ring(baseConfig).portalAt("https://irrelevant.com")

    expect(portal.prevUrl, equals, "https://hub.com")
    expect(portal.prevTitle, equals, "Test ring")
  },

  "points the 'next' link to the hub"() {
    const portal = new Ring(baseConfig).portalAt("https://irrelevant.com")

    expect(portal.nextUrl, equals, "https://hub.com")
    expect(portal.nextTitle, equals, "Test ring")
  },

  "points the 'hub' link to the hub"() {
    const portal = new Ring(baseConfig).portalAt("https://irrelevant.com")

    expect(portal.hubUrl, equals, "https://hub.com")
    expect(portal.hubTitle, equals, "Test ring")
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
    const portal = new Ring(oneMemberConfig).portalAt("https://hub.com")

    expect(portal.prevUrl, equals, "https://first.one/dir/index.html")
    expect(portal.prevTitle, equals, "First")
  },

  "points the 'next' link on the hub page to that member"() {
    const portal = new Ring(oneMemberConfig).portalAt("https://hub.com")

    expect(portal.nextUrl, equals, "https://first.one/dir/index.html")
    expect(portal.nextTitle, equals, "First")
  },

  "points the 'prev' link on the member page to itself"() {
    const portal = new Ring(oneMemberConfig).portalAt("https://first.one/dir/index.html")

    expect(portal.prevUrl, equals, "https://first.one/dir/index.html")
    expect(portal.prevTitle, equals, "First")
  },

  "points the 'next' link on the member page to itself"() {
    const portal = new Ring(oneMemberConfig).portalAt("https://first.one/dir/index.html")

    expect(portal.nextUrl, equals, "https://first.one/dir/index.html")
    expect(portal.nextTitle, equals, "First")
  },
})

const twoMemberConfig = {
  ...baseConfig,
  members: [
    {
      title: "First",
      landingPage: "https://first.one/dir/index.html",
      scope: "https://first.one",
    },
    {
      title: "Second",
      landingPage: "https://second.one/dir/index.html",
      scope: "https://second.one",
    },
  ]
}

test("a ring with two members", {
  "points the 'prev' link on the hub page to the second member"() {
    const ring = new Ring(twoMemberConfig).portalAt("https://hub.com")

    expect(ring.prevUrl, equals, "https://second.one/dir/index.html")
    expect(ring.prevTitle, equals, "Second")
  },

  "points the 'next' link on the hub page to the first member"() {
    const ring = new Ring(twoMemberConfig).portalAt("https://hub.com")

    expect(ring.nextUrl, equals, "https://first.one/dir/index.html")
    expect(ring.nextTitle, equals, "First")
  },
})