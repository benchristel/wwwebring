export function generateCss(configUrl: string) {
  const container = `[data-wwwebring="${configUrl}"]`
  return `
${container} .wwwebring-widget {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  border: 2px outset #dcd;
  background: #f6f0ff;
  color: #000;
  padding-block: 0.5em;
  text-align: center;
}

${container} .wwwebring-widget a {
  display: inline-block;
  padding: 0.75em;
  font-weight: bold;
  color: inherit;
  text-decoration: 1px underline #777;
}

${container} .wwwebring-widget a:hover {
  background: #fff5;
}

${container} .wwwebring-ring-links {
  display: flex;
  align-items: center;
}

${container} .wwwebring-prev, .wwwebring-next {
  flex-basis: 10em;
  flex-grow: 1;
  display: flex;
  align-items: center;
}

${container} .wwwebring-prev {
  justify-content: flex-end;
}

${container} .wwwebring-next {
  justify-content: flex-start;
}

${container} .wwwebring-prev > a::before {
  content: '<<';
  padding-inline-end: 1em;
}

${container} .wwwebring-next > a::after {
  content: '>>';
  padding-inline-start: 1em;
}

${container} .wwwebring-divider::before {
  content: '\\2766';
  padding-inline: 1em;
}
`
}