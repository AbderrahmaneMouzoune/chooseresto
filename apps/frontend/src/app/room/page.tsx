import RoomCreate from "@/app/room/_room/room-create";
import { Headline } from "@components/ui/headline";

export default function Home() {
  return (
    <main className="container space-y-2">
      <Headline variant={"h1"} className="text-center">
        Tinder restaurant
      </Headline>

      <RoomCreate />
    </main>
  );
}
