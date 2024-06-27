# Directus Web Scraper Extension

This extension allows you to scrape data and store it in Directus.
It takes advantage of flows and custom operations, to scrape a site with a given url,
whenever a new item is created in the specified Directus Collection.

## Installation

- Clone the repository:

```sh
git clone https://github.com/tobshub/directus-extension-web-scraper.git
cd directus-extension-web-scraper
```

- Install the dependencies & build the extension:

```sh
npm install
npm run build
```

- Finally, refer to the Directus extension installation [guide](https://docs.directus.io/extensions/installing-extensions.html#installing-via-the-extensions-directory) for how to add the extension to Directus.

## Usage

- Create a new Directus Collection, with at least `website_url` and `website_data` text fields.
- Create a flow that triggers on `item.create` event from the specified Directus Collection.
- Attach this extension to the flow in Directus as a custom operation.
