import { factories } from "@strapi/strapi";

/**
 * Kudos Router
 */
export default factories.createCoreRouter("api::kudos.kudos", {
  config: {
    find: {
      middlewares: ["api::kudos.kudos"], // Add the kudos middleware for the find endpoint
    },
  },
});
