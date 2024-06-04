import {test, expect, is} from "@benchristel/taste";
import {Scope} from "./scope";

test("a scope given a malformed URL", {
  "doesn't match a URL"() {
    const scope = new Scope("&")
    expect(scope.matches("http://foo.com"), is, false)
  },

  "doesn't match the string it was given"() {
    const scope = new Scope("&")
    expect(scope.matches("&"), is, false)
  },
})

test("a scope given an empty string", {
  "doesn't match any URL"() {
    const scope = new Scope("")
    expect(scope.matches("http://foo.com"), is, false)
  },

  "doesn't match empty string"() {
    const scope = new Scope("")
    expect(scope.matches(""), is, false)
  }
})

test("a valid scope", {
  "matches an identical URL"() {
    const scope = new Scope("https://foo.com")
    expect(scope.matches("https://foo.com"), is, true)
  },

  "does not match a URL with a different domain"() {
    const scope = new Scope("https://foo.com")
    expect(scope.matches("https://bar.com"), is, false)
  },

  "ignores the port"() {
    const scope = new Scope("https://foo.com:80")
    expect(scope.matches("https://foo.com:443"), is, true)
  },

  "ignores the path"() {
    const scope = new Scope("https://foo.com/blah")
    expect(scope.matches("https://foo.com/zzz"), is, true)
  },

  "ignores the protocol"() {
    const scope = new Scope("https://foo.com")
    expect(scope.matches("ftp://foo.com"), is, true)
  },

  "ignores a www subdomain in the scope"() {
    const scope = new Scope("https://www.foo.com")
    expect(scope.matches("https://foo.com"), is, true)
  },

  "ignores a www subdomain in the matched URL"() {
    const scope = new Scope("https://foo.com")
    expect(scope.matches("https://www.foo.com"), is, true)
  },

  "does not match a URL with a different subdomain"() {
    const scope = new Scope("https://wwwblah.foo.com")
    expect(scope.matches("https://lah.foo.com"), is, false)
  },
})