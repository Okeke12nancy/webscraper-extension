import * as cheerio from "cheerio";

export default class WebScraperService {
  constructor() {}

  async validatePage(url: string) {
    // Validate URL
    try {
      new URL(url);
    } catch (error) {
      throw new PageLoadError("Invalid URL");
    }
  }

  async getCompanySiteData(url: string) {
    console.log(`Crawling ${url}`);
    try {
      await this.validatePage(url);
      const html = await fetch(url).then((res) => res.text());

      const $ = cheerio.load(html);
      const tagsToExtract = [
        "span",
        "div",
        "p",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "li",
        "a",
        "ol",
        "ul",
      ];
      let content = "";
      tagsToExtract.forEach((tag) => {
        $(tag).each((_, element) => {
          content = content + " " + $(element).text();
        });
      });

      content = content.slice(0, 5000);
      content = content
        .replace(/\.\w+/g, "")
        .replace(/(.)\1/g, "")
        .replace(/#\S/g, "")
        .replace(/-\w+/g, "")
        .replace(/\s+/g, " ");

      return content;
    } catch (error) {
      console.error("Error in getCompanySiteData:", error);
      throw error;
    }
  }
}

class PageLoadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PageLoadError";
  }
}
