import { factories } from '@strapi/strapi';
import { prioritizeByRegionalLocation } from '../../../services/location-sorter';

export default factories.createCoreController('api::page.page', ({ strapi }) => ({
  async find(ctx) {
    // Call the default core controller find() which will have your populate middleware applied.
    const { data, meta } = await super.find(ctx);

    // Retrieve the current user's regional location from the header (adjust as necessary)
    const userRegionalLocation = ctx.request.headers['x-user-location'];

    const componentNames = {
      'HolidayCalendarList': 'holiday-calendar.holiday-calendar-list',
    };

    // Use Promise.all to handle asynchronous operations
    const updatedData = await Promise.all(data.map(async (page) => {
      const { sortingSelector } = page;
      if (
        sortingSelector &&
        sortingSelector.enableLocationSorting &&
        sortingSelector.componentName &&
        Array.isArray(page.blocks)
      ) {
        // Use Promise.all here as well to handle async operations in blocks
        page.blocks = await Promise.all(page.blocks.map(async (component) => {
          if (
            component.__component === componentNames[sortingSelector.componentName] &&
            Array.isArray(component.items)
          ) {
            component.items = await prioritizeByRegionalLocation(
              component.items,
              userRegionalLocation as string,
              sortingSelector.sortingLocationType
            );
          }
          return component;
        }));
      }
      return page;
    }));

    // Return the modified response.
    ctx.body = { data: updatedData, meta };
  },
}));