// File: src/services/location-sorter.ts

/**
 * Reorders an array of items so that those with a matching regionalLocation come first.
 *
 * @param items - The items array from the target component.
 * @param userRegionalLocation - The name of the user's regional location.
 * @returns The sorted items array.
 */
export async function prioritizeByRegionalLocation(items: any[], userLocation: string, locType: string): Promise<any[]> {
  if (!userLocation || !Array.isArray(items)) return items;
  const officeRecords = await strapi.documents('api::workplace-office-location.workplace-office-location').findMany({
    filters: { name: userLocation },
    populate: {
      regionalLocation: true,
      globalLocation: true
    }
  });

  if(!officeRecords || officeRecords.length === 0) return items;
  const sortingLocation = officeRecords[0][locType].name;
  const matching = items.filter(item =>
    item.regionalLocation && item[locType].name === sortingLocation
  );
  const nonMatching = items.filter(item =>
    !item.regionalLocation || item[locType].name !== sortingLocation
  );

  return [...matching, ...nonMatching];
}
