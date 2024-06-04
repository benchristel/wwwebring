import {test, expect, is} from "@benchristel/taste"
import {parseUrlOrNull, urlEscape} from "./urls"

test("urlEscape", {
  "escapes spaces"() {
    expect(urlEscape(" "), is, "%20")
  },

  "escapes quotes"() {
    expect(urlEscape('"'), is, "%22")
  },

  "escapes angle brackets"() {
    expect(urlEscape('<>'), is, "%3C%3E")
  },

  "does not touch existing escapes"() {
    expect(urlEscape('%20'), is, "%20")
  }
})

test("parseUrlOrNull", {
  "is null given a string that can't possibly be a URL"() {
    expect(parseUrlOrNull("/"), is, null)
  },

  "parses a well-formed URL"() {
    expect(parseUrlOrNull("http://foo.com")?.hostname, is, "foo.com")
  },

  "tries its best when the protocol is missing"() {
    expect(parseUrlOrNull("foo.com")?.hostname, is, "foo.com")
  },
})