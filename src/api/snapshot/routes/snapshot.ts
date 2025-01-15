/**
 * snapshot router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::snapshot.snapshot");
const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::snapshot.snapshot", {
  config: {
    find: {
      middlewares: ["api::snapshot.snapshot"],
    },
  },
});
