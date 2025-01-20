import { factories } from "@strapi/strapi";

/**
 * Snapshot Router
 */
export default factories.createCoreRouter("api::snapshot.snapshot", {
  config: {
    find: {
      middlewares: ["api::snapshot.snapshot"], // Add the snapshot middleware for the find endpoint
    },
  },
});
