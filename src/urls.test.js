import {test, expect, is} from "@benchristel/taste"
import {urlEscape} from "./urls.js"

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