// File: src/services/location-sorter.ts

/**
 * Reorders an array of items so that those with a matching regionalLocation come first.
 *
 * @param items - The items array from the target component.
 * @param userRegionalLocation - The name of the user's regional location.
 * @returns The sorted items array.
 */
export async function prioritizeByRegionalLocation(items: any[], userLocation: string = process.env.FALLBACK_USER_LOCATION_CODE, locType: string): Promise<any[]> {
  if (!userLocation || !Array.isArray(items)) return items;
  const regionalRecords = await strapi.documents('api::workplace-regional-location.workplace-regional-location').findMany({
    filters: { code: userLocation },
    populate: {
      globalLocation: true
    }
  });

  if(!regionalRecords || regionalRecords.length === 0) return items;
  const sortingLocation = locType === 'globalLocation' ? regionalRecords[0].globalLocation.name : regionalRecords[0].name;
  const matching = items.filter(item =>
    item[locType]?.name === sortingLocation
  );
  const nonMatching = items.filter(item =>
    !item[locType] || item[locType].name !== sortingLocation
  );

  return [...matching, ...nonMatching];
}