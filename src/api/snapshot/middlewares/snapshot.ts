/**
 * `snapshot` middleware
 */

import { Core } from "@strapi/strapi";

export default ({ strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: any, next: () => Promise<void>) => {
    if (ctx.request.url.startsWith("/api/snapshots")) {
      // Preserve existing query parameters
      const existingQuery = { ...ctx.query };

      // Add `populate` field for imageSlider, merge with the existing query
      ctx.query = {
        ...existingQuery,
        populate: {
          imageSlider: {
            populate: "*",
          },
        },
      };
    }

    // Move to the next middleware or route handler
    await next();
  };
};
