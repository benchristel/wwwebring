export function contains(expectedSubstring, s) {
  return s.includes(expectedSubstring)
}

export function isDisregardingSpaces(rawExpected, rawActual) {
  if (typeof rawExpected !== "string") return false;
  if (typeof rawActual !== "string") return false;

  const expected = stripSpacesFromHTML(rawExpected)
  const actual = stripSpacesFromHTML(rawActual)

  return expected === actual
}

function stripSpacesFromHTML(html) {
  return html.replace(/\s+/g, " ").replace(/ ?([<>]) ?/g, "$1")
}
