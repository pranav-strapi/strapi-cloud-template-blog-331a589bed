import { Core } from "@strapi/strapi";

export default (config: any, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: any, next: () => Promise<void>) => {
    // Check if the request is targeting the `/api/pages` endpoint
    if (ctx.request.url.startsWith("/api/pages")) {
      // Extend the query to include population for all required fields
      ctx.query = {
        ...ctx.query, // Preserve existing query parameters
        populate: {
          breadcrumbs: {
            populate: "*", // Populate all fields in breadcrumbs component
          },
          banner: {
            populate: {
              image: true, // Populate the 'image' field in the banner component
              description: true, // Populate the 'description' field in the banner component
            },
          },
          blocks: {
            on: {
              "shared.text-editor": {
                populate: "*", // Populate all fields in the text editor component
              },
              "shared.main-page-overview": {
                populate: {
                  image: true, // Populate the 'image' field
                  subPages: true, // Populate the 'subPages' field
                },
              },
              "shared.image": {
                populate: "*", // Populate all fields in the shared image component
              },
              "shared.holiday-calender": {
                populate: "*", // Populate all fields in the holiday calendar component
              },
              "stream.stream-card-grid": {
                populate: {
                  contents: true, // Populate the 'contents' field in the stream card grid
                },
              },
              "stream.company-policy": {
                populate: "*", // Populate all fields in the company policy component
              },
            },
          },
        },
      };
    }

    // Proceed to the next middleware or controller
    await next();
  };
};
