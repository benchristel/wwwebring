import {parseUrlOrNull} from "../lib/urls";

export class Scope {
  private _url: URL | undefined;

  constructor(
    private rawUrl: string
  ){}

  matches(rawUrl: string) {
    if (this.url == null) {
      return false;
    }

    const url = parseUrlOrNull(rawUrl)
    if (url == null) {
      return false;
    }
    
    return normalizedHostname(this.url) === normalizedHostname(url)
  }

  private get url(): URL | null {
    try {
      return this._url ??= new URL(this.rawUrl);
    } catch {
      return null;
    }
  }
}

function normalizedHostname(url: URL): string {
  return url.hostname.replace(/^www\./, "")
}