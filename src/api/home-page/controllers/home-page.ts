const { createCoreController } = require('@strapi/strapi').factories;
const { getRegionalLocation } = require('../../../services/location-sorter');

module.exports = createCoreController('api::home-page.home-page', ({ strapi }) => ({
  async find(ctx) {
    // Call the default find method
    const { data, meta } = await super.find(ctx);
    
    // Fetch holiday data
    const holidayData = await this.fetchHolidayData();
    
    // Get user location and region
    const userLocation = ctx.request.headers['x-user-location'];
    const region = await getRegionalLocation(userLocation);
    
    // Find holiday for the user's region
    const regionHoliday = this.findRegionHoliday(holidayData, region);
    
    // Add holiday data to the response
    data.calendar = {
      holiday: regionHoliday
    };
    
    return { data, meta };
  },

  async fetchHolidayData() {
    return strapi.documents('api::page.page').findFirst({
      filters: {
        slug: {
          $eq: 'holiday-calendar'
        }
      },
      populate: {
        blocks: {
          on: {
            "holiday-calendar.holiday-calendar-list": {
              populate: {
                items: {
                  populate: "*",
                },
              },
            },
          },
        },
      },
    });
  },

  findRegionHoliday(holidayData, region) {
    const holidayItem = holidayData.blocks[0].items.find(item => item.regionalLocation.name === region);
    return holidayItem ? holidayItem.holiday : null;
  }
}));