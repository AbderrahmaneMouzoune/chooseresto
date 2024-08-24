import { getRoomById } from "@/data-access/room";
import { PublicError } from "./error";

export async function getRoomByIdUseCase(roomId: string) {
  const room = await getRoomById(roomId);

  if (!room) {
    throw new PublicError("Room not found");
  }

  return room;
}
