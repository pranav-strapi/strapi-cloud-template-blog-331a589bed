import { factories } from "@strapi/strapi";

/**
 * Page Router
 */
export default factories.createCoreRouter("api::page.page", {
  config: {
    find: {
      middlewares: ["api::page.page"], // Add the page middleware for the find endpoint
    },
  },
});
