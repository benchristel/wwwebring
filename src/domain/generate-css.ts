export function generateCss(configUrl: string) {
  const container = `[data-wwwebring="${configUrl}"]`
  return `
${container} .wwwebring-widget {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  border: var(--wwwebring-border, none);
  background: var(--wwwebring-background, transparent);
  padding-block: 0.5em;
  text-align: center;
}

${container} .wwwebring-widget a {
  display: inline-block;
  padding: 0.75em;
  font-weight: bold;
  color: var(--wwwebring-text-color, inherit);
}

${container} .wwwebring-ring-links {
  display: flex;
  align-items: center;
  justify-content: center;
}

${container} .wwwebring-prev, .wwwebring-next {
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

${container} .wwwebring-divider {
  padding-inline: 0.5em;
}
`
}