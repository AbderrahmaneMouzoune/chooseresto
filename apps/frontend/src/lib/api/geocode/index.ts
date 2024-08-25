import { env } from "@/env.mjs";
import type { GeocodeMaps } from "./type";

export async function getGeoCodeFromAddress(
  address: string,
): Promise<GeocodeMaps[] | []> {
  const response = await fetch(
    `https://geocode.maps.co/search?q=${address}&api_key=${env.GEOCODE_MAPS_API_KEY}`,
  );

  const data: GeocodeMaps[] = await response.json();

  return data || [];
}
