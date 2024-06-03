
export function model(config) {
  return new Ring(config)
}

export class Ring {
  constructor(config, currentUrl) {
    this.config = config;
    this.currentUrl = currentUrl;
  }

  get prevUrl() {
    return this.config.hub;
  }

  get prevTitle() {
    return this.config.name;
  }

  get hubUrl() {
    return this.config.hub;
  }

  get hubTitle() {
    return this.config.name;
  }

  get nextUrl() {
    return this.config.hub;
  }

  get nextTitle() {
    return this.config.name;
  }
}