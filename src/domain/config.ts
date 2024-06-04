export type Config = {
  // Human-readable name of the webring
  name: string;
  // URL of the webring hub page
  hub: string;
  // Members of the webring
  members: MemberSite[]
}

export type MemberSite = {
  // Name of the website
  title: string;
  // URL of the page that visitors will arrive on via webring links
  landingPage: string;
}