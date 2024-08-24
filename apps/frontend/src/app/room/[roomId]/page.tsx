import { Headline } from "@/components/ui/headline";
import { formatDate } from "@/lib/utils";
import { getRoomByIdUseCase } from "@/use-cases/room";

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
        {room.attributes.name}
      </Headline>
      <Headline variant={"p"}>
        crée le{" "}
        {room.attributes.createdAt &&
          formatDate(new Date(room.attributes.createdAt), "dd/mm à HH:mm")}{" "}
        par{" "}
        <span className="text-primary">
          {room.attributes.creator?.data?.attributes?.name}
        </span>
      </Headline>

      <section className=""></section>
    </main>
  );
}
