/**
 * page router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::page.page");

("use strict");

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::page.page", {
  config: {
    find: {
      middlewares: ["api::page.page"],
    },
  },
});
