/**
 * kudos router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::kudos.kudos");

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::kudos.kudos", {
  config: {
    find: {
      middlewares: ["api::kudos.kudos"],
    },
  },
});
