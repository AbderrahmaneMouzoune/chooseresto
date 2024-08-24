// export async function createRoom(room: GetValues<"api::room.room">) {}

import { strapiFetcher } from "@/lib/api/strapi";
import { NotFoundError } from "@/use-cases/error";
import type {
  StrapiResponseCollection,
  StrapiResponseData,
} from "@chooseresto/backend";

export async function getRoomById(
  roomId: string,
): Promise<StrapiResponseData<"api::room.room">> {
  try {
    const response = (await strapiFetcher("api::room.room", {
      filters: {
        id: {
          $eq: roomId,
        },
      },
      populate: ["creator"],
    })) as StrapiResponseCollection<"api::room.room">;

    console.log(response);
    return response?.data?.[0];
  } catch (error) {
    throw new NotFoundError();
  }
}
