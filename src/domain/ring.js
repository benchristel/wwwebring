export class Ring {
  constructor(config) {
    this.config = config;
  }

  portalAt(url) {
    return new Portal(this, url);
  }

  hub() {
    return {
      landingPage: this.config.hub,
      title: this.config.name,
    };
  }

  numMembers() {
    return this.config.members.length
  }

  memberAt(offset) {
    const index = (offset + this.numMembers()) % this.numMembers()
    return this.config.members[index]
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
    return this.hub().landingPage;
  }

  get hubTitle() {
    return this.hub().title;
  }

  get nextUrl() {
    return this.next().landingPage;
  }

  get nextTitle() {
    return this.next().title;
  }

  // private
  hub() {
    return this.ring.hub()
  }

  // private
  prev() {
    if (this.ring.numMembers() === 1) {
      return this.ring.memberAt(0)
    }
    return this.ring.hub();
  }

  // private
  next() {
    if (this.ring.numMembers() === 1) {
      return this.ring.memberAt(0)
    }
    return this.ring.hub();
  }
}