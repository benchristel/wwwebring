import {test, expect, is} from "@benchristel/taste"
import {htmlEscape} from "./html"

test("htmlEscape", {
  "escapes special characters"() {
    expect(
      htmlEscape(`<>&'"<>&'"`),
      is("&lt;&gt;&amp;&#39;&quot;&lt;&gt;&amp;&#39;&quot;"),
    )
  },
})
