import { Core } from "@strapi/strapi";

export default ({ strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: any, next: () => Promise<void>) => {
    // Ensure existing query parameters are preserved
    const existingQuery = ctx.query || {};

    // Ensure populate exists and is an object
    const existingPopulate = existingQuery.populate || {};

    // Merge existing populate fields with the required one
    ctx.query = {
      ...existingQuery,
      populate: {
        ...existingPopulate,
        workplaceOfficeLocations: {
          fields: ["name"],
        },
      },
    };

    // Move to the next middleware or route handler
    await next();
  };
};
