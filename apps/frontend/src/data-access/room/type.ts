import type { GetValues, StrapiResponseData } from "@chooseresto/backend";

export type Room = GetValues<"api::room.room"> & {
  id: number;
};

export function roomAdapter(room: StrapiResponseData<"api::room.room">): Room {
  return {
    id: room.id,
    name: room.attributes.name,
    participants: room.attributes.participants,
    creator: room.attributes.creator,
    createdAt: room.attributes.createdAt,
    updatedAt: room.attributes.updatedAt,
  };
}
