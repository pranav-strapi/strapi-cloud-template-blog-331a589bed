import { Core } from "@strapi/strapi";

export default (config: any, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: any, next: () => Promise<void>) => {
    // Check if the request is targeting the `/api/pages` endpoint
    try {
      if (ctx.request.url.startsWith("/api/pages")) {
        // Check if any filter is applied
        const hasFilter = Object.keys(ctx.query).some((param) =>
          param.startsWith("fields")
        );

        if (hasFilter) {
          // If a filter is present, only show slug and breadcrumbs
          ctx.query = {
            ...ctx.query,
            populate: {
              breadcrumbs: {
                populate: "*", // Populate all fields in breadcrumbs component
              }, // Preserve existing query parameters
            },
          };
        } else {
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
              sortingSelector: {
                populate: "*",
              },
              blocks: {
                on: {
                  "shared.text-editor": {
                    populate: "*", // Populate all fields in the text editor component
                  },
                  "shared.main-page-overview": {
                    populate: "*",
                  },
                  "shared.image": {
                    populate: "*", // Populate all fields in the shared image component
                  },
                  "holiday-calendar.holiday-calendar-list": {
                    populate: {
                      items: {
                        populate: "*",
                      },
                    },
                  },
                  "shared.accordion-list": {
                    populate: {
                      items: {
                        populate: "*",
                      },
                    },
                  },
                  "stream.stream-card-grid": {
                    populate: {
                      contents: { populate: "*" },
                    },
                  },
                  "stream.company-policy": {
                    populate: "*", // Populate all fields in the company policy component
                  },
                  "page.google-sheet": {
                    populate: "*", // Populate all fields in the page.google-sheet component
                  },
                },
              },
            },
          };
        }

        console.log(
          "Query after middleware:",
          JSON.stringify(ctx.query, null, 2)
        );
      }

      // Proceed to the next middleware or controller
      await next();
    } catch (error) {
      strapi.log.error("Error in pages middleware:", error);

      ctx.status = 500;
      ctx.body = {
        status: 500,
        error: "Internal Server Error",
        details: error.message,
      };
    }
  };
};
