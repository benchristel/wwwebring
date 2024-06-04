import {test, expect, is, equals} from "@benchristel/taste"
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

  "returns the hub page from memberAt"() {
    const ring = new Ring(baseConfig)
    expect(ring.memberAt(0), equals, {
      landingPage: "https://hub.com",
      scope: "https://hub.com",
      title: "Test ring",
    })
  }
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

  "returns the lone member from memberAt(0)"() {
    const ring = new Ring(oneMemberConfig)
    expect(ring.memberAt(0), equals, {
      landingPage: "https://first.one/dir/index.html",
      title: "First",
      scope: "https://first.one",
    })
  },

  "returns the lone member from memberAt(1)"() {
    const ring = new Ring(oneMemberConfig)
    expect(ring.memberAt(1), equals, {
      landingPage: "https://first.one/dir/index.html",
      title: "First",
      scope: "https://first.one",
    })
  },

  "returns the lone member from memberAt(-1)"() {
    const ring = new Ring(oneMemberConfig)
    expect(ring.memberAt(-1), equals, {
      landingPage: "https://first.one/dir/index.html",
      title: "First",
      scope: "https://first.one",
    })
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
    const portal = new Ring(twoMemberConfig)
      .portalAt("https://hub.com")

    expect(portal.prevUrl, equals, "https://second.one/dir/index.html")
    expect(portal.prevTitle, equals, "Second")
  },

  "points the 'next' link on the hub page to the first member"() {
    const portal = new Ring(twoMemberConfig)
      .portalAt("https://hub.com")

    expect(portal.nextUrl, equals, "https://first.one/dir/index.html")
    expect(portal.nextTitle, equals, "First")
  },

  "points the 'prev' link on the first member's page to the second member"() {
    const portal = new Ring(twoMemberConfig)
      .portalAt("https://first.one/dir/index.html")

    expect(portal.prevUrl, equals, "https://second.one/dir/index.html")
    expect(portal.prevTitle, equals, "Second")
  },

  "points the 'next' link on the first member's page to the second member"() {
    const portal = new Ring(twoMemberConfig)
      .portalAt("https://first.one/dir/index.html")

    expect(portal.nextUrl, equals, "https://second.one/dir/index.html")
    expect(portal.nextTitle, equals, "Second")
  },

  "returns the first member from memberAt(0)"() {
    const ring = new Ring(twoMemberConfig)
    expect(ring.memberAt(0).title, equals, "First")
  },

  "returns the second member from memberAt(1)"() {
    const ring = new Ring(twoMemberConfig)
    expect(ring.memberAt(1).title, equals, "Second")
  },

  "returns the first member from memberAt(2)"() {
    const ring = new Ring(twoMemberConfig)
    expect(ring.memberAt(2).title, equals, "First")
  },

  "returns the second member from memberAt(-1)"() {
    const ring = new Ring(twoMemberConfig)
    expect(ring.memberAt(-1).title, equals, "Second")
  },

  "finds the first member at index 1"() {
    const ring = new Ring(twoMemberConfig)
    expect(ring.memberIndex("https://first.one/dir/index.html"), is, 0)
  },

  "does not find a nonexistent member"() {
    const ring = new Ring(twoMemberConfig)
    expect(ring.memberIndex("https://idontexist.com"), is, -1)
  }
})