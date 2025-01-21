/**
 * layout router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::layout.layout", {
  config: {
    find: {
      middlewares: ["api::layout.layout"], // Add the page middleware for the find endpoint
    },
  },
});
