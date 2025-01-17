import { factories } from "@strapi/strapi";

/**
 * Burst Router
 */
export default factories.createCoreRouter("api::burst.burst", {
  config: {
    find: {
      middlewares: ["api::burst.burst"], // Add the burst middleware for the find endpoint
    },
  },
});
