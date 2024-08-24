import { getRoomById, getRooms } from "@/data-access/room";
import type { GetValues, StrapiResponseData } from "@chooseresto/backend";
import { PublicError } from "./error";

export type TRoom = GetValues<"api::room.room"> & {
  id: number;
};

function roomAdapter(room: StrapiResponseData<"api::room.room">): TRoom {
  return {
    id: room.id,
    name: room.attributes.name,
    participants: room.attributes.participants,
    creator: room.attributes.creator,
    createdAt: room.attributes.createdAt,
    updatedAt: room.attributes.updatedAt,
  };
}

export async function getRoomByIdUseCase(roomId: string): Promise<TRoom> {
  const room = await getRoomById(roomId);

  if (!room) {
    throw new PublicError("Room not found");
  }

  return roomAdapter(room);
}

export async function getRoomsUseCase(): Promise<TRoom[]> {
  const rooms = await getRooms();

  if (!rooms) {
    throw new PublicError("No rooms");
  }

  return rooms.data.map(roomAdapter);
}
