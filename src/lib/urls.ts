export function urlEscape(s: string): string {
  return String(s)
    .replace(/[ "<>]/g, c => "%" + c.charCodeAt(0).toString(16).toUpperCase())
}