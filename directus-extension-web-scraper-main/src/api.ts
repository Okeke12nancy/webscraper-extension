import { defineOperationApi } from "@directus/extensions-sdk";
import WebScraperService from "./webscraper";

export default defineOperationApi({
  id: "web_scraper_extension",
  handler: async (_, { data, database }) => {
    const trigger = data["$trigger"] as {
      payload: { website_url: string };
      collection: string;
    };

    const webScraperService = new WebScraperService();
    const siteData = await webScraperService.getCompanySiteData(
      trigger.payload.website_url,
    );

    await database(trigger.collection)
      .where({ website_url: trigger.payload.website_url })
      .update({ website_data: siteData });

    return trigger;
  },
});

