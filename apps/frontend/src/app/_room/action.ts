"use server";

import { getGeoCodeFromAddress } from "@/lib/api/geocode";
import { unauthenticatedAction } from "@/lib/safe-action";
import { z } from "zod";

export const getPlacesFromAddressAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      address: z.string().min(5).max(100),
    }),
  )
  .handler(async ({ input }) => {
    return await getGeoCodeFromAddress(input.address);
  });
