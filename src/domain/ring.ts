import type {Config, Linkable} from "./config";
import type {PortalLocation} from "./portal-location";

export class Ring {
  constructor(private config: Config) {}

  portalAt(location: PortalLocation): Portal {
    return new Portal(this, location);
  }

  *sites() {
    const hub = this.hub()
    yield {name: hub.name, url: hub.url}
    for (let i = 0; i < this.numMembers(); i++) {
      yield this.memberAt(i)
    }
  }

  hub(): Linkable {
    return this.config;
  }

  numMembers(): number {
    return this.config.members.length
  }

  memberAt(offset: number): Linkable {
    if (this.numMembers() === 0) {
      return this.hub()
    }

    const index = (offset + this.numMembers()) % this.numMembers()
    return this.config.members[index]
  }

  // memberIndex returns -1 on not found
  memberIndex(location: PortalLocation): number {
    return this.config.members.findIndex(({url}) =>
      location.matches(url)
    )
  }
}

export class Portal {
  constructor(
    private ring: Ring,
    private location: PortalLocation,
  ) {}

  get prevUrl(): string {
    return this.prev().url;
  }

  get prevTitle(): string {
    return this.prev().name;
  }

  get hubUrl(): string {
    return this.hub().url;
  }

  get hubTitle(): string {
    return this.hub().name;
  }

  get nextUrl(): string {
    return this.next().url;
  }

  get nextTitle(): string {
    return this.next().name;
  }

  private hub(): Linkable {
    return this.ring.hub()
  }

  private prev(): Linkable {
    const currentMemberIndex = this.ring.memberIndex(this.location)
    if (currentMemberIndex === -1) {
      return this.ring.memberAt(-1)
    }
    return this.ring.memberAt(currentMemberIndex - 1)
  }

  private next(): Linkable {
    const currentMemberIndex = this.ring.memberIndex(this.location)
    if (currentMemberIndex === -1) {
      return this.ring.memberAt(0)
    }
    return this.ring.memberAt(currentMemberIndex + 1)
  }
}