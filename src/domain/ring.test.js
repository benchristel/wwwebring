import {test, expect, equals} from "@benchristel/taste"
import {model} from "./ring.js"

test("model", {
  "points all links to the hub when the webring has no members"() {
    const config = {
      "name": "Test ring",
      "configLocation": "https://example.com/ring.json",
      "hub": "https://example.com",
      "members": []
    }

    const theModel = model(config, "https://irrelevant.com")

    expect(theModel, equals, {
      prevUrl: "https://example.com",
      prevTitle: "Test ring",
      hubUrl: "https://example.com",
      hubTitle: "Test ring",
      nextUrl: "https://example.com",
      nextTitle: "Test ring"
    })
  }
})
