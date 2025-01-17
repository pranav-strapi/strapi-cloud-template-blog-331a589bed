import { Core } from "@strapi/strapi";

export default (config: any, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: any, next: () => Promise<void>) => {
    // Check if the request is for the `/api/pages` endpoint
    if (ctx.request.url.startsWith("/api/pages")) {
      // Update the query to populate all necessary fields
      ctx.query = {
        ...ctx.query, // Preserve existing query parameters
        populate: {
          banner: {
            populate: {
              image: true,
              description: true,
            },
          },
          blocks: {
            on: {
              "shared.holiday-calender": {
                populate: "*",
              },
              "shared.text-editor": {
                populate: "*",
              },
              "shared.main-page-overview": {
                populate: {
                  image: true,
                  subPages: true,
                },
              },
              "shared.image": {
                populate: "*",
              },
              "stream.stream-card-grid": {
                populate: {
                  contents: true,
                },
              },
              "stream.company-policy": {
                populate: "*",
              },
            },
          },
        },
      };
    }

    await next(); // Proceed to the next middleware or controller
  };
};
