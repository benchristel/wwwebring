import {test, expect, is} from "@benchristel/taste"
import {PortalLocation} from "./portal-location"

test("PortalLocation", {
  "matches if the real URL matches"() {
    const loc = new PortalLocation("http://foo.com", null)
    expect(loc.matches("http://foo.com"), is, true)
  },

  "does not match if the real URL mismatches and there is no hint"() {
    const loc = new PortalLocation("http://foo.com", null)
    expect(loc.matches("http://bar.com"), is, false)
  },

  "does not match if the real URL mismatches and the hint is empty"() {
    const loc = new PortalLocation("http://foo.com", "")
    expect(loc.matches("http://bar.com"), is, false)
  },

  "matches if the hint matches"() {
    const loc = new PortalLocation("http://foo.com", "http://bar.com")
    expect(loc.matches("http://bar.com"), is, true)
  },

  "uses Scope matching semantics"() {
    const loc = new PortalLocation("http://www.foo.com/blah.html", "")
    expect(loc.matches("https://foo.com"), is, true)
  },
})