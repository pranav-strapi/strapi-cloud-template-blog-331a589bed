/**
 * `home-page` middleware
 */

import type { Core } from "@strapi/strapi";

export default (config: any, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: any, next: () => Promise<void>) => {
    strapi.log.info("In home-page middleware.");

    // Check if the request is a GET request and has a 'populate' query parameter
    if (ctx.method === "GET" && !ctx.query.populate) {
      ctx.query.populate = {
        actionLinks: {
          populate: "*", // Populate all fields of the `actionLinks` component
        },
        quickLinks: {
          populate: "*", // Populate all fields of the `quickLinks` component
        },
        bannerType: {
          populate: "*", // Populate all fields of the `quickLinks` component
        },
        portalLinks: {
          populate: "*", // Populate all fields of the `portalLinks` component
        },
        banner: {
          populate: {
            image: true, // Populate the 'image' field in the banner component
          },
        },
      };
    }

    await next();
  };
};
