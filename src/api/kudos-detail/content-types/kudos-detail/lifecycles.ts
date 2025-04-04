import searchService from "../../../search/services/search";
 
 export default {
   async afterCreate() { await searchService.syncData(); },
   async afterUpdate() { await searchService.syncData(); },
   async afterDelete() { await searchService.syncData(); },
 };