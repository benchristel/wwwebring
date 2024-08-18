import { PortalLocation } from "../domain/portal-location"
import {Ring} from "../domain/ring"
import * as fs from "fs"
import { sanitizeUrl } from "../lib/urls"
import { join, dirname } from "path"

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

function redirectHtml(toName: string, toUrl: string) {
  const name = toName
  const url = sanitizeUrl(toUrl)
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta http-equiv="refresh" content="0;url=${url}">
    <title>Redirect</title>
  </head>
  <body>
    <p>The webring is sending you to <a href="${url}">${name}</a></p>
  </body>
</html>`
}