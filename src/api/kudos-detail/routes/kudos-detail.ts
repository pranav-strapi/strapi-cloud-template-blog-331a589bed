import { factories } from "@strapi/strapi";

/**
 * Kudos Router
 */
export default factories.createCoreRouter("api::kudos-detail.kudos-detail", {
  config: {
    find: {
      middlewares: ["api::kudos-detail.kudos-detail"], // Add the kudos middleware for the find endpoint
    },
  },
});
