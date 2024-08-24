import { env } from "@/env.mjs";
import qs from "qs";
import type { GoogleApiResponse } from "./type";

export async function fetcherGoogleMap(
  path: string,
  urlParamsObject = {},
  options = {},
) {
  if (!env.GOOGLE_API_KEY) {
    throw new Error("No Google Api Key");
  }

  try {
    const cacheDuration: number = env.NODE_ENV === "development" ? 0 : 60;
    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: cacheDuration },
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl =
      "https://maps.googleapis.com/maps" +
      `/api${path}${queryString ? `?${queryString}` : ""}&key=${
        env.GOOGLE_API_KEY
      }`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Please check if your server is running and you set all the required tokens.`,
    );
  }
}

export async function fetchGooglePlaces({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): Promise<Restaurant[]> {
  const radius = 1500;
  const type = "restaurant";
  let nextPageToken: string | undefined = undefined;
  let results: GoogleApiResponse[] = [];

  do {
    try {
      let params: any = {
        location: `${latitude},${longitude}`,
        radius: `${radius}`,
        type,
      };

      if (nextPageToken) {
        params = { ...params, pageToken: `${nextPageToken}` };
      }

      const response = await fetcherGoogleMap(
        "/place/nearbysearch/json",
        params,
      );

      results = results.concat(response.results);
      nextPageToken = response.next_page_token;
    } catch (error) {
      console.error(error);
      return [];
    }
  } while (nextPageToken && results.length < 20);

  return googleMapsPlacesAdapterToRestaurant(results);
}

function googleMapsPlacesAdapterToRestaurant(
  googleApiResponse: GoogleApiResponse[],
): Restaurant[] {
  return googleApiResponse.map((restaurant) => {
    return {
      name: restaurant.name,
      types: restaurant.types,
      rating: restaurant.rating,
      address: restaurant.vicinity,
      priceLevel: restaurant.price_level,
      isOpen: restaurant.business_status === "OPERATIONAL",
      placeId: restaurant.place_id,
      photo: restaurant.photos?.[0],
    };
  });
}
