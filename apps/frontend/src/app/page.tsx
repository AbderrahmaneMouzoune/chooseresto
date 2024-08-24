import { getRoomsUseCase } from "@/use-cases/room";
import { Headline } from "@components/ui/headline";
import Rooms from "./room/rooms";

export default async function Home() {
  const rooms = await getRoomsUseCase();

  return (
    <main className="container space-y-2">
      <Headline variant={"h1"} className="text-center">
        Tinder restaurant
      </Headline>

      {rooms.length > 0 && <Rooms rooms={rooms} />}
    </main>
  );
}
