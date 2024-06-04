import { Scope } from "./scope";

export class PortalLocation {
  constructor(
    private realUrl: string,
    private hint: string | null,
  ) {}

  matches(url: string): boolean {
    return this.scopes.some(s => s.matches(url))
  }

  private get scopes(): Scope[] {
    return [this.realUrl, this.hint]
      .filter(nonNull)
      .map(u => new Scope(u))
  }
}

function nonNull<T>(x: T | null | undefined): x is T {
  return x != null
}