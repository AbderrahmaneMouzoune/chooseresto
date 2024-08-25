import { Headline } from "@/components/ui/headline";
import { formatDate } from "@/lib/utils";
import { getRoomByIdUseCase } from "@/use-cases/room";
import { Participant } from "../_room/participants";

interface PageProps {
  params: {
    roomId: string;
  };
}

export default async function PageRoot({ params }: PageProps) {
  const room = await getRoomByIdUseCase(params.roomId);

  return (
    <main className="container space-y-2">
      <Headline variant={"h1"} className="text-center">
        {room.name}
      </Headline>
      <Headline variant={"p"}>
        crée le{" "}
        {room.createdAt &&
          formatDate(new Date(room.createdAt), "dd/mm à HH:mm")}{" "}
        par{" "}
        <span className="text-primary">
          {room.creator?.data?.attributes?.name}
        </span>
      </Headline>

      <section className="grid grid-cols-2 gap-2">
        {room.participants?.data.map((participant, index) => (
          <Participant
            key={`participant-${index}`}
            name={participant.attributes.name}
          />
        ))}
      </section>
    </main>
  );
}
