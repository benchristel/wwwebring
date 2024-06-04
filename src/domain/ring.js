export class Ring {
  constructor(config) {
    this.config = config;
  }

  portalAt(url) {
    return new Portal(this, url);
  }
}

class Portal {
  constructor(ring, currentUrl) {
    this.ring = ring;
    this.currentUrl = currentUrl
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

  get config() {
    return this.ring.config
  }

  // private
  prev() {
    if (this.config.members.length === 1) {
      return this.config.members[0]
    }
    return {
      landingPage: this.config.hub,
      title: this.config.name,
    };
  }

  // private
  next() {
    if (this.config.members.length === 1) {
      return this.config.members[0]
    }
    return {
      landingPage: this.config.hub,
      title: this.config.name,
    };
  }
}