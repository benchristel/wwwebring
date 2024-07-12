import {test, expect, is} from "@benchristel/taste"
import {parseUrlOrNull, sanitizeUrl} from "./urls"

test("sanitizeUrl", {
  "escapes spaces"() {
    expect(sanitizeUrl("https://example.com/ "), is, "https://example.com/%20")
  },

  "escapes quotes"() {
    expect(sanitizeUrl('https://example.com/"'), is, "https://example.com/%22")
  },

  "escapes angle brackets"() {
    expect(sanitizeUrl('https://example.com/<>'), is, "https://example.com/%3C%3E")
  },

  "does not touch existing escapes"() {
    expect(sanitizeUrl('https://example.com/%20'), is, "https://example.com/%20")
  },

  "defaults undefined to #"() {
    expect(sanitizeUrl(undefined), is, "#")
  },

  "defaults null to #"() {
    expect(sanitizeUrl(null), is, "#")
  },

  "replaces non-HTTP urls with #"() {
    expect(sanitizeUrl("javascript:alert('hacked')"), is, "#")
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