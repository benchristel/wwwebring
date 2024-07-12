import {test, expect, is} from "@benchristel/taste"
import {parseUrlOrNull, sanitizeUrl} from "./urls"

test("sanitizeUrl", {
  "escapes spaces"() {
    expect(sanitizeUrl(" "), is, "%20")
  },

  "escapes quotes"() {
    expect(sanitizeUrl('"'), is, "%22")
  },

  "escapes angle brackets"() {
    expect(sanitizeUrl('<>'), is, "%3C%3E")
  },

  "does not touch existing escapes"() {
    expect(sanitizeUrl('%20'), is, "%20")
  },

  "defaults undefined to empty string"() {
    expect(sanitizeUrl(undefined), is, "")
  },

  "defaults null to empty string"() {
    expect(sanitizeUrl(null), is, "")
  },
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