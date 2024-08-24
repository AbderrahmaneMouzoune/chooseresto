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
      populate: ["creator", "participants"],
    })) as StrapiResponseCollection<"api::room.room">;

    return response?.data?.[0];
  } catch (error) {
    throw new NotFoundError();
  }
}

export async function getRooms(): Promise<
  StrapiResponseCollection<"api::room.room">
> {
  return await strapiFetcher("api::room.room", {
    populate: ["participants", "creator"],
  });
}
