import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Headline } from "@/components/ui/headline";
import { formatDate } from "@/lib/utils";

import type { Room as TRoom } from "@/data-access/room/type";
import Link from "next/link";
import type { TParticipant } from "./participants";
import Participants from "./participants";

interface RoomsProps {
  rooms: TRoom[];
}
export default function Rooms({ rooms }: RoomsProps) {
  if (rooms.length === 0) {
    return null;
  }

  return (
    <section className="grid gap-5 md:grid-cols-2">
      {rooms.map((room) => {
        return (
          <Link key={room.id} href={`/room/${room.id}`}>
            <Room room={room} />
          </Link>
        );
      })}
    </section>
  );
}

interface RoomProps {
  room: TRoom;
}

function Room({ room }: RoomProps) {
  const { participants, ...roomWithoutParticipant } = room;

  return (
    <Card key={`room-${room.id}`}>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Headline variant={"p"}>Liste des participants</Headline>
        <CardDescription className="flex gap-1">
          {participants && (
            <Participants
              participants={
                participants?.data.map((participant) => ({
                  name: participant.attributes.name,
                  createdAt: participant.attributes.createdAt,
                  updatedAt: participant.attributes.updatedAt,
                  room: roomWithoutParticipant,
                })) as unknown as TParticipant[]
              }
            />
          )}
        </CardDescription>
      </CardContent>
      {room.createdAt && (
        <CardFooter>
          <CardDescription>
            Room created @{formatDate(new Date(room.createdAt), "dd/MM HH:mm")}
          </CardDescription>
        </CardFooter>
      )}
    </Card>
  );
}
