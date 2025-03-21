import axios from "axios";

export default (plugin: any) => {
  const originalAuthController = plugin.controllers.auth;

  plugin.controllers.auth = (context: any) => {
    const originalController = originalAuthController(context);

    const originalCallback = originalController.callback;

    originalController.callback = async (ctx: any) => {
      const response = await originalCallback(ctx);
      if (ctx.body && ctx.body.jwt && ctx.body.user && ctx.body.user.email) {
        try {
          // Step 1: Get Bearer Token
          const tokenResponse = await axios.post(
            process.env.PROFILE_TOKEN_URL as string,
            new URLSearchParams({
              grant_type: "client_credentials",
              client_id: process.env.PROFILE_TOKEN_CLIENT_ID as string,
              client_secret: process.env.PROFILE_TOKEN_CLIENT_SECRET as string,
              scope: process.env.PROFILE_TOKEN_SCOPE as string,
            }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
          );

          const bearerToken = tokenResponse.data.access_token;

          // Step 2: Call Profile API to fetch location
          const profileResponse = await axios.get(
            `https://profiles.qburst.com/api/v1/workplace/employees?employee_email=${encodeURIComponent(ctx.body.user.email)}`,
            {
              headers: {
                Authorization: `Bearer ${bearerToken}`,
              },
            }
          );

          const responseData = JSON.parse(profileResponse.data);

          const profileData = responseData[0];

          if (profileData && profileData.location) {
            const regionalRecord = await strapi.documents('api::workplace-regional-location.workplace-regional-location').findMany({
              filters: {
                workplaceOfficeLocations: {
                  name: profileData.location
                }
              },
              populate: ['workplaceOfficeLocations']
            });

            ctx.body.user.location = regionalRecord[0]?.code || process.env.FALLBACK_USER_LOCATION_CODE;
          } else {
            console.log("⚠️ profileData or profileData.location is undefined");
            ctx.body.user.location = process.env.FALLBACK_USER_LOCATION_CODE;
          }
        } catch (error) {
          console.error("⚠️ Error fetching location:", error);
          ctx.body.user.location = process.env.FALLBACK_USER_LOCATION_CODE;
        }
      } else {
        console.log("⚠️ Missing email, user, or jwt:", ctx.body);
      }

      return response;
    };

    return originalController;
  };

  return plugin;
};