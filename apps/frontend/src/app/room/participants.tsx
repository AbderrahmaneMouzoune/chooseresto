import { Badge } from "@/components/ui/badge";
import type { GetValues } from "@chooseresto/backend";

export type TParticipant = GetValues<"api::participant.participant">;

export default function Participants({
  participants,
}: {
  participants: TParticipant[];
}) {
  return participants.map((participant, index) => (
    <Participant key={index} name={participant.name} />
  ));
}

export function Participant(participant: TParticipant) {
  return <Badge>{participant.name}</Badge>;
}
