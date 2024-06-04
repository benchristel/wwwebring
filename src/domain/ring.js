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
    if (this.numMembers() === 0) {
      return this.hub()
    }

    const index = (offset + this.numMembers()) % this.numMembers()
    return this.config.members[index]
  }

  memberIndex(searchUrl) {
    return this.config.members.findIndex(url => url === searchUrl)
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
    const currentMemberIndex = this.ring.memberIndex(this.currentUrl)
    if (this.currentMemberIndex == null) {
      return this.ring.memberAt(-1)
    }
    return this.ring.memberAt(currentMemberIndex - 1)
  }

  // private
  next() {
    const currentMemberIndex = this.ring.memberIndex(this.currentUrl)
    if (this.currentMemberIndex == null) {
      return this.ring.memberAt(0)
    }
    return this.ring.memberAt(currentMemberIndex + 1)
  }
}