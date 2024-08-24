import { Headline } from "@components/ui/headline";
import CreateProfile from "@layouts/create-profile";

export default function Home() {
  return (
    <main className="container space-y-2">
      <Headline variant={"h1"} className="text-primary-400 text-center">
        Tinder restaurant
      </Headline>

      <CreateProfile />
    </main>
  );
}
