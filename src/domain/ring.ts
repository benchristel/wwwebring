import type {Config, MemberSite} from "./config";
import type {PortalLocation} from "./portal-location";
import type {Scope} from "./scope";

export class Ring {
  constructor(private config: Config) {}

  portalAt(location: PortalLocation): Portal {
    return new Portal(this, location);
  }

  hub(): MemberSite {
    return {
      landingPage: this.config.hub,
      title: this.config.name,
    };
  }

  numMembers(): number {
    return this.config.members.length
  }

  memberAt(offset: number): MemberSite {
    if (this.numMembers() === 0) {
      return this.hub()
    }

    const index = (offset + this.numMembers()) % this.numMembers()
    return this.config.members[index]
  }

  // memberIndex returns -1 on not found
  memberIndex(location: PortalLocation): number {
    return this.config.members.findIndex(({landingPage}) =>
      location.matches(landingPage)
    )
  }
}

export class Portal {
  constructor(
    private ring: Ring,
    private location: PortalLocation,
  ) {}

  get prevUrl(): string {
    return this.prev().landingPage;
  }

  get prevTitle(): string {
    return this.prev().title;
  }

  get hubUrl(): string {
    return this.hub().landingPage;
  }

  get hubTitle(): string {
    return this.hub().title;
  }

  get nextUrl(): string {
    return this.next().landingPage;
  }

  get nextTitle(): string {
    return this.next().title;
  }

  private hub(): MemberSite {
    return this.ring.hub()
  }

  private prev(): MemberSite {
    const currentMemberIndex = this.ring.memberIndex(this.location)
    if (currentMemberIndex === -1) {
      return this.ring.memberAt(-1)
    }
    return this.ring.memberAt(currentMemberIndex - 1)
  }

  private next(): MemberSite {
    const currentMemberIndex = this.ring.memberIndex(this.location)
    if (currentMemberIndex === -1) {
      return this.ring.memberAt(0)
    }
    return this.ring.memberAt(currentMemberIndex + 1)
  }
}