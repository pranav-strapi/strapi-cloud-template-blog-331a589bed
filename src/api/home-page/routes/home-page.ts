/**
 * home-page router
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::kudos.kudos");
("use strict");

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::home-page.home-page", {
  config: {
    find: {
      middlewares: ["api::home-page.home-page"],
    },
  },
});
