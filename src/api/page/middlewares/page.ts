/**
 * `page` middleware
 */

import type { Core } from "@strapi/strapi";

interface Entry {
  id: string | number; // Allow both string and number for the `id`
  author?: { id: string | number }; // Adjust `author.id` type similarly
  [key: string]: any; // Allow other dynamic properties
}

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    strapi.log.info("In burst middleware.");

    // Check if the request is a GET request and has a 'populate' query parameter
    if (ctx.method === "GET" && !ctx.query.populate) {
      ctx.query.populate = "*"; // Populate all relations if not specified
    }

    const user = ctx.state.user;
    const entryId = ctx.params.id;

    if (entryId) {
      try {
        const entry: Entry = await strapi.entityService.findOne(
          "api::page.page",
          entryId,
          { populate: "*" }
        );

        if (entry?.author?.id && user?.id !== entry.author.id) {
          return ctx.unauthorized("This action is unauthorized.");
        }
      } catch (error) {
        strapi.log.error("Error fetching entry:", error);
        return ctx.internalServerError(
          "An error occurred while processing the request."
        );
      }
    }

    await next();
  };
};
