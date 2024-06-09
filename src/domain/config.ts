export interface Config extends Linkable {
  members: Linkable[]
}

export interface Linkable {
  // Name of the website
  name: string;
  // URL of the page that visitors will arrive on via webring links
  url: string;
}