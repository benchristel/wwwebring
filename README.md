# wwwebring

A fully clientside webring library, suitable for static sites.

As seen on [waywardweb.org](https://waywardweb.org)!

## Joining a Webring

Read this section if you want to join a webring maintained by someone else.

Add this HTML to your page where you want the webring widget to appear. Replace the value of `data-wwwebring` with the URL the webring maintainer gives you.

```html
<script defer src="https://cdn.jsdelivr.net/npm/wwwebring@0.2.0"></script>
<div
  data-wwwebring="https://waywardweb.org/ring.json"
  data-wwwebring-theme="default"
></div>
```

The webring script adds CSS to the page to style the widget. If you'd rather bring your own CSS, remove the `data-wwwebring-theme="default"` attribute.

Currently, the default theme is the only one that exists, but I might add more in the future.

### Tweaking the Theme Colors

The default theme is somewhat customizable via CSS variables. The available variables are:

- `--wwwebring-border` - applied to the `border` property of the widget. Example value: `2px solid black`.
- `--wwwebring-background` - applied to the `background` property. Example value: `url(https://placekitten.com/200/300)`.
- `--wwwebring-text-color` - applied to the `color` property. Example value: `green`.

To set these variables, you can add them to a `style` attribute on the widget `div`:

```html
<div
  style="--wwwebring-text-color: green; --wwwebring-background: #eff;"
  data-wwwebring="https://waywardweb.org/ring.json"
  data-wwwebring-theme="default"
></div>
```

### Mirrors and Dev Servers

The webring widget looks at the current URL of the page to figure out which site it's on and thus where the "previous" and "next" links should go to. If you have a mirror of your main site, or a local development server, and you want the widget to display the correct links there, you'll have to do a tiny bit of extra configuration.

Add a `data-wwwebring-you-are-here` attribute to your HTML, like this:

```html
<div
  data-wwwebring="https://waywardweb.org/ring.json"
  data-wwwebring-theme="default"
  data-wwwebring-you-are-here="https://yoursite.example.com"
></div>
```

Replace https://yoursite.example.com with the URL of your main site.

If the widget can't figure out which site it's on based on the real URL of the page, it will look at the `data-wwwebring-you-are-here` attribute instead. If that attribute isn't present, or isn't the URL of a site that belongs to the webring, the "next" and "previous" links will default to the first and last sites in the webring, respectively.

## Hosting a Webring

Read this section if you want to create your own webring.

Webrings are configured via a JSON file that lists the members of the webring and defines the order in which they will link to each other. Here is an example of the format: https://waywardweb.org/ring.json

```json
{
  "name": "The Wayward Webring",
  "url": "https://waywardweb.org",
  "members": [
    {
      "name": "Ben's Site",
      "url": "https://ben.waywardweb.org"
    },
    {
      "name": "Bastion",
      "url": "https://bastionhome.github.io"
    }
  ]
}
```

To run your own webring, you'll need to create a JSON file in this format and host it somewhere. Give the members of the webring the URL of this file and tell them to put it in the `data-wwwebring` attribute of the webring `div`.

Whenever members join or leave the webring, update the JSON file accordingly.

## Development

Read this section if you want to modify the code for the `wwwebring` library itself.

```bash
# run TypeScript in watch mode
yarn ts
# run the tests
yarn test
```

### Releasing

```
yarn version
npm publish
```