export function sanitizeUrl(s: string): string {
  return String(s)
    .replace(/[ "<>]/g, c => "%" + c.charCodeAt(0).toString(16).toUpperCase())
}

export function parseUrlOrNull(url: string): URL | null {
  if (!hasProtocol(url)) {
    url = "https://" + url
  }
  try {
    return new URL(url);
  } catch {
    return null;
  }
}

function hasProtocol(url: string): boolean {
  return /^[a-z]+:\/\//.test(url)
}