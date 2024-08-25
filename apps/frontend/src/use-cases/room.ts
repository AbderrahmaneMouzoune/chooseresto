import { getRoomById, getRooms } from "@/data-access/room";
import type { Room } from "@/data-access/room/type";
import { roomAdapter } from "@/data-access/room/type";
import { PublicError, StrapiError } from "./error";

export async function getRoomByIdUseCase(roomId: string): Promise<Room> {
  const roomUnformatted = await getRoomById(roomId);

  if (!roomUnformatted) {
    throw new PublicError("Room not found");
  }

  const room = roomAdapter(roomUnformatted);

  if (!room) {
    throw new StrapiError("Error while mapping [room] data");
  }

  return room;
}

export async function getRoomsUseCase(): Promise<Room[]> {
  const roomsUnformatted = await getRooms();

  if (!roomsUnformatted) {
    throw new PublicError("No rooms");
  }

  const rooms = roomsUnformatted.map(roomAdapter);

  if (!rooms) {
    throw new StrapiError("Error while mapping [rooms] data");
  }

  return rooms;
}
