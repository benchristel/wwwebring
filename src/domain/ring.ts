import type {Config, MemberSite} from "./config";
import {Scope} from "./scope";

export class Ring {
  constructor(private config: Config) {}

  portalAt(url: string): Portal {
    return new Portal(this, url);
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
  memberIndex(url: string): number {
    return this.config.members.findIndex(({landingPage}) =>
      new Scope(landingPage).matches(url)
    )
  }
}

export class Portal {
  constructor(
    private ring: Ring,
    private currentUrl: string,
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
    const currentMemberIndex = this.ring.memberIndex(this.currentUrl)
    if (currentMemberIndex === -1) {
      return this.ring.memberAt(-1)
    }
    return this.ring.memberAt(currentMemberIndex - 1)
  }

  private next(): MemberSite {
    const currentMemberIndex = this.ring.memberIndex(this.currentUrl)
    if (currentMemberIndex === -1) {
      return this.ring.memberAt(0)
    }
    return this.ring.memberAt(currentMemberIndex + 1)
  }
}