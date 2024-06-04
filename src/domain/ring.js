export class Ring {
  constructor(config, currentUrl) {
    this.config = config;
    this.currentUrl = currentUrl;
  }

  get prevUrl() {
    return this.prev().landingPage;
  }

  get prevTitle() {
    return this.prev().title;
  }

  get hubUrl() {
    return this.config.hub;
  }

  get hubTitle() {
    return this.config.name;
  }

  get nextUrl() {
    return this.next().landingPage;
  }

  get nextTitle() {
    return this.next().title;
  }

  // private
  prev() {
    if (this.config.members.length > 0) {
      return this.config.members[0]
    }
    return {
      landingPage: this.config.hub,
      title: this.config.name,
    };
  }

  // private
  next() {
    if (this.config.members.length > 0) {
      return this.config.members[0]
    }
    return {
      landingPage: this.config.hub,
      title: this.config.name,
    };
  }
}