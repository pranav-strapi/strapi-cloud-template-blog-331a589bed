import type { Core } from "@strapi/strapi";

export default (config: any, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: any, next: () => Promise<void>) => {
    strapi.log.info("In burst middleware.");

    // Check if the request is a GET request and has a 'populate' query parameter
    if (ctx.method === "GET" && !ctx.query.populate) {
      ctx.query.populate = {
        imageSlider: {
          populate: "*", // Populate all fields in the `imageSlider` component
        },
      };
    }

    await next();
  };
};
