/**
 * `page` middleware
 */

import type { Core } from "@strapi/strapi";

export default (config: any, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: any, next: () => Promise<void>) => {
    strapi.log.info("In page middleware.");

    // Check if the request is a GET request and has a 'populate' query parameter
    if (ctx.method === "GET" && !ctx.query.populate) {
      ctx.query.populate = {
        banner: {
          populate: "*", // Populate all fields of the `banner` component
        },
        blocks: {
          populate: {
            on: {
              "shared.text-editor": { populate: "*" },
              "shared.main-page-overview": { populate: "*" },
              "shared.image": { populate: "*" },
              "shared.holiday-calender": { populate: "*" },
              "stream.stream-card-grid": { populate: "*" },
              "stream.company-policy": { populate: "*" },
            },
          },
        },
      };
    }

    await next();
  };
};
