// export async function createRoom(room: GetValues<"api::room.room">) {}
import { strapiFetcher } from "@/lib/api/strapi";
import { NotFoundError } from "@/use-cases/error";
import type { StrapiResponseCollection } from "@chooseresto/backend";
import type { Room } from "./type";
import { roomAdapter } from "./type";

export async function getRoomById(roomId: string): Promise<Room> {
  const response: StrapiResponseCollection<"api::room.room"> =
    await strapiFetcher("api::room.room", {
      filters: {
        id: {
          $eq: roomId,
        },
      },
      populate: ["creator", "participants"],
    });

  if (!response.data) {
    throw new NotFoundError();
  }

  return roomAdapter(response.data[0]);
}

export async function getRooms(): Promise<Room[]> {
  const roomsFromDb: StrapiResponseCollection<"api::room.room"> =
    await strapiFetcher("api::room.room", {
      populate: ["participants", "creator"],
    });

  return roomsFromDb.data?.map(roomAdapter) || [];
}
