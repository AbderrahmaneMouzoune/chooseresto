// export async function createRoom(room: GetValues<"api::room.room">) {}
import { strapiFetcher } from "@/lib/api/strapi";
import type {
  StrapiResponseCollection,
  StrapiResponseData,
} from "@chooseresto/backend";

export async function getRoomById(
  roomId: string,
): Promise<StrapiResponseData<"api::room.room">> {
  const response: StrapiResponseCollection<"api::room.room"> =
    await strapiFetcher("api::room.room", {
      filters: {
        id: {
          $eq: roomId,
        },
      },
      populate: ["creator", "participants"],
    });

  return response?.data?.[0];
}

export async function getRooms(): Promise<
  StrapiResponseData<"api::room.room">[]
> {
  const response: StrapiResponseCollection<"api::room.room"> =
    await strapiFetcher("api::room.room", {
      populate: ["participants", "creator"],
    });

  return response.data || [];
}
