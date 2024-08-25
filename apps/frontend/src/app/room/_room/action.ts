"use server";

import { getGeoCodeFromAddress } from "@/lib/api/geocode";
import { fetchGooglePlaces } from "@/lib/api/google";
import { middlewareAction } from "@/lib/safe-action";
import { z } from "zod";

export const getPlacesFromAddressAction = middlewareAction
  .createServerAction()
  .input(
    z.object({
      address: z.string().min(5).max(100),
    }),
  )
  .handler(async ({ input }) => {
    return await getGeoCodeFromAddress(input.address);
  });

export const getRestaurantsFromGeoPointsAction = middlewareAction
  .createServerAction()
  .input(
    z.object({
      lon: z.number(),
      lat: z.number(),
    }),
  )
  .handler(async ({ input }) => {
    return await fetchGooglePlaces({
      latitude: input.lat,
      longitude: input.lon,
    });
  });
