export function urlEscape(s) {
  return String(s).replace(/[ "<>]/g, c => "%" + c.charCodeAt(0).toString(16).toUpperCase())
}