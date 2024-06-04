export class Ring {
  constructor(config, currentUrl) {
    this.config = config;
    this.currentUrl = currentUrl;
  }

  get prevUrl() {
    if (this.config.members.length > 0) {
      return this.config.members[0].landingPage
    }
    return this.config.hub;
  }

  get prevTitle() {
    if (this.config.members.length > 0) {
      return this.config.members[0].title
    }
    return this.config.name;
  }

  get hubUrl() {
    return this.config.hub;
  }

  get hubTitle() {
    return this.config.name;
  }

  get nextUrl() {
    if (this.config.members.length > 0) {
      return this.config.members[0].landingPage
    }
    return this.config.hub;
  }

  get nextTitle() {
    if (this.config.members.length > 0) {
      return this.config.members[0].title
    }
    return this.config.name;
  }
}