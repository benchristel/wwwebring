import { PortalLocation } from "../domain/portal-location"
import {Ring} from "../domain/ring"
import * as fs from "fs"
import { sanitizeUrl } from "../lib/urls"
import { join, dirname } from "path"
import { htmlEscape } from "../lib/html"

const [configPath, outputDirPath] = process.argv.slice(2)

const ring = new Ring(JSON.parse(fs.readFileSync(configPath, "utf-8")))

for (const site of ring.sites()) {
  const portal = ring.portalAt(new PortalLocation(site.url, null))
  const hostname = new URL(site.url).hostname

  {
    const nextFilePath = join(outputDirPath, hostname, "next", "index.html")
    fs.mkdirSync(dirname(nextFilePath), {recursive: true})
    fs.writeFileSync(nextFilePath, redirectHtml(portal.nextTitle, portal.nextUrl), "utf-8")
  }
  
  {
    const prevFilePath = join(outputDirPath, hostname, "previous", "index.html")
    fs.mkdirSync(dirname(prevFilePath), {recursive: true})
    fs.writeFileSync(prevFilePath, redirectHtml(portal.prevTitle, portal.prevUrl), "utf-8")
  }
}

// This HTML uses 3 strategies to ensure the user ends up on the correct page:
// 1. JavaScript redirect. This is the most immediate; in Firefox it seems to
//    happen before the initial paint (e.g. the dark mode styling does not take
//    effect).
// 2. <meta http-equiv="refresh"> - a fallback for browsers with JS disabled.
//    Slightly slower and not recommended by W3C.
// 3. <noscript> text with a link - a fallback for browsers with neither JS nor
//    support for http-equiv="refresh".
//
// If (1) gets used, the redirect page will not appear in the user's
// browser history. The same goes for (2), probably.
//
// Ideally, of course, the server would send a 302 redirect response, so none
// of this would be needed. But neither GitHub Pages nor Neocities enables
// sites to specify such redirects.
function redirectHtml(toName: string, toUrl: string) {
  const name = htmlEscape(toName)
  const url = sanitizeUrl(toUrl)
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta http-equiv="refresh" content="0;url=${url}">
    <title>Redirect</title>
    <script type="text/javascript">window.location.replace("${url}")</script>
    <style>@media(prefers-color-scheme:dark){html{color:#fff;background:#000}a,a:visited{color:#aaf}}</style>
  </head>
  <body>
    <noscript>
      <p>The webring is sending you to <a href="${url}">${name}</a>. To continue to that page, <a href="${url}">click here</a>.</p>
    </noscript>
  </body>
</html>`
}