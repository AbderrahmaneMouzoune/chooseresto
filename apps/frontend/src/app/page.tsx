import CreateRoom from "@/app/layouts/create-room";
import { Headline } from "@components/ui/headline";

export default function Home() {
  return (
    <main className="container space-y-2">
      <Headline variant={"h1"} className="text-primary-400 text-center">
        Tinder restaurant
      </Headline>

      <CreateRoom />
    </main>
  );
}
