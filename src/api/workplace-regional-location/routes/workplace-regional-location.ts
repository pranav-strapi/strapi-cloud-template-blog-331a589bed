/**
 * workplace-regional-location router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter("api::workplace-regional-location.workplace-regional-location", {
    config: {
      find: {
        middlewares: ["api::workplace-regional-location.workplace-regional-location"], // Add the snapshot middleware for the find endpoint
      },
    },
  });