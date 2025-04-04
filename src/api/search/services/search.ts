import { UID } from '@strapi/strapi';
import { algoliasearch } from 'algoliasearch';
import { JSDOM } from "jsdom";
const client = algoliasearch(process.env.ALGOLIA_APP_ID!, process.env.ALGOLIA_ADMIN_API_KEY!);

const MAX_TEXT_LENGTH = 9000;

/**
 * Interface for Page content type
 */
interface Page {
  id: number;
  title: string;
  breadcrumbs?: { url: string }[];
  blocks: { content?: string }[];
}

/**
 * Interface for Kudos content type
 */
interface Kudos {
  id: number;
  documentId: string;
  title: string;
  blocks?: { content?: string }[];
}

/**
 * Interface for Burst content type
 */
interface Burst {
  id: number;
  documentId: string;
  burstTitle: string;
  description: string;
}

/**
 * Interface for Snapshot content type
 */
interface Snapshot {
  id: number;
  documentId: string;
  title: string;
  description: string;
}

/**
 * Extract plain text from HTML content
 */
const extractTextFromHTML = (html: string): string => {
  if (!html) return "";
  const dom = new JSDOM(html);
  return dom.window.document.body.textContent || "";
};

/**
 * Split large text into smaller chunks for indexing
 */
const splitContentIntoChunks = (text: string, chunkSize = MAX_TEXT_LENGTH) => {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.substring(i, i + chunkSize));
  }
  return chunks;
};

/**
 * Fetch data from Strapi for a given content type
 */
const fetchStrapiData = async <T>(contentType: string, populateOptions: object | null = null): Promise<T[]> => {
  try {
    return await strapi.documents(`api::${contentType}.${contentType}` as UID.ContentType).findMany({
      populate: populateOptions === null ? '*' : populateOptions
    }) as T[];
  } catch (error) {
    console.error(`❌ Error fetching ${contentType} data:`, error);
    return [];
  }
};

/**
* Format Page Data
*/
const formatPages = (pages: Page[]) => {
  return pages.flatMap((page) => {
    const contentChunks = splitContentIntoChunks(
      extractTextFromHTML(page.blocks.map((comp) => comp.content || "").join(" "))
    );

    return contentChunks.map((chunk, index) => ({
      objectID: `page-${page.id}-${index}`,
      type: "page",
      title: page.title,
      url: `${process.env.FRONTEND_URL}${page.breadcrumbs?.[page.breadcrumbs.length - 1]?.url || ""}`,
      content: chunk,
    }));
  }).flat();
};

/**
* Format Kudos Data
*/
const formatKudos = (kudos: Kudos[]) => {
  return kudos.map((item) => {
    const contentChunks = splitContentIntoChunks(
      extractTextFromHTML(item.blocks?.map((comp) => comp.content || "").join(" ") || "")
    );

    return contentChunks.map((chunk, index) => ({
      objectID: `kudos-${item.id}-${index}`,
      type: "kudos",
      title: item.title,
      url: `${process.env.FRONTEND_URL}/kudos?id=${item.documentId}`,
      content: chunk,
    }));
  }).flat();
};

/**
* Format Bursts Data
*/
const formatBursts = (bursts: Burst[]) =>
  bursts.map((burst) => ({
    objectID: `burst-${burst.id}`,
    type: "burst",
    title: burst.burstTitle,
    url: `${process.env.FRONTEND_URL}/bursts?id=${burst.documentId}`,
    content: burst.description,
  }));

/**
* Format Snapshots Data
*/
const formatSnapshots = (snapshots: Snapshot[]) =>
  snapshots.map((item) => ({
    objectID: `snapshot-${item.id}`,
    type: "snapshot",
    title: item.title,
    url: `${process.env.FRONTEND_URL}/snapshots?id=${item.documentId}`,
    content: extractTextFromHTML(item.description),
  }));

export default {
  async syncData() {
    try {
      // Fetch pages with dynamic zones
      const pages = await fetchStrapiData<Page>("page", {
        breadcrumbs: { populate: "*" },
        blocks: {
          on: {
            "shared.text-editor": { populate: "*" },
            "shared.main-page-overview": { populate: "*" },
            "shared.image": { populate: "*" },
            "holiday-calendar.holiday-calendar-list": { populate: { items: { populate: "*" } } },
            "shared.accordion-list": { populate: { items: { populate: "*" } } },
            "stream.stream-card-grid": { populate: { contents: { populate: "*" } } },
            "stream.company-policy": { populate: "*" },
            "page.google-sheet": { populate: "*" },
          },
        },
      });

      const kudos = await fetchStrapiData<Kudos>("kudos-detail");
      const bursts = await fetchStrapiData<Burst>("burst");
      const snapshots = await fetchStrapiData<Snapshot>("snapshot");

      // Format Data
      const formattedPages = formatPages(pages);
      const formattedKudos = formatKudos(kudos);
      const formattedBursts = formatBursts(bursts);
      const formattedSnapshots = formatSnapshots(snapshots);

      // Combine all data and send to Algolia
      const allData = [...formattedPages, ...formattedKudos, ...formattedBursts, ...formattedSnapshots];

      await client.setSettings({
        indexName: 'STRAPI_index',
        indexSettings: {
          attributesToHighlight: ["title", "content"],
          attributesToSnippet: ["content:20"], // Show 20-character snippets of matching text
          snippetEllipsisText: "...",
        }
      });
      await client.saveObjects(({ indexName: 'STRAPI_index', objects: allData }));
      console.log("✅ Data synced with Algolia successfully!");

    } catch (error) {
      console.error("❌ Error syncing data with Algolia", error);
    }
  },
};