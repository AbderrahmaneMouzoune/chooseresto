import { getRoomById, getRooms } from "@/data-access/room/room";
import type { Room } from "@/data-access/room/type";
import { PublicError } from "./error";

export async function getRoomByIdUseCase(roomId: string): Promise<Room> {
  const room = await getRoomById(roomId);

  if (!room) {
    throw new PublicError("Room not found");
  }

  return room;
}

export async function getRoomsUseCase(): Promise<Room[]> {
  const rooms = await getRooms();

  if (!rooms) {
    throw new PublicError("No rooms");
  }

  return rooms;
}
