import { factories } from "@strapi/strapi";

/**
 * Home Page Router
 */
export default factories.createCoreRouter("api::home-page.home-page", {
  config: {
    find: {
      middlewares: ["api::home-page.home-page"], // Add the home-page middleware for the find endpoint
    },
  },
});
