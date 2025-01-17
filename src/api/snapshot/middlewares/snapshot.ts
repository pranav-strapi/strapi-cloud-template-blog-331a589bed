/**
 * `snapshot` middleware
 */

import { Core } from "@strapi/strapi";

export default ({ strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: any, next: () => Promise<void>) => {
    if (ctx.request.url.startsWith("/api/snapshots")) {
      ctx.query = {
        populate: {
          slider: {
            populate: "*",
          },
        },
      };
    }
    await next();
  };
};
