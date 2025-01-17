/**
 * burst router
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::burst.burst");

("use strict");

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::burst.burst", {
  config: {
    find: {
      middlewares: ["api::burst.burst"],
    },
  },
});
