/**
 * `layout` middleware
 */

import { Core } from "@strapi/strapi";

export default (config: any, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: any, next: () => Promise<void>) => {
    // Check if the request is for the `/api/layouts` endpoint
    if (ctx.request.url.startsWith("/api/layouts")) {
      // Update the query to populate necessary fields
      ctx.query = {
        ...ctx.query, // Preserve existing query parameters
        populate: {
          menuGroup: {
            populate: "*", // Populate all fields within the `menuGroup` component
          },
        },
      };
    }

    await next(); // Proceed to the next middleware or controller
  };
};
