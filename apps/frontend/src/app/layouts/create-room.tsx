"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@components/ui/card";
import { FormItem } from "@components/ui/form";
import { Input } from "@components/ui/input";
import { micah } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { PlayIcon } from "@radix-ui/react-icons";
import Image from "next/image";

const possibleAvatar = [
  "Princess",
  "Abby",
  "Boo",
  "Loki",
  "Coco",
  "Cleo",
  "Buddy",
];

export default function CreateRoom() {
  const avatarName =
    possibleAvatar[(Math.random() * 100) % possibleAvatar.length];
  const avatar = createAvatar(micah, {
    seed: avatarName,
  });

  const cantCreateRoom = true;

  return (
    <Card>
      <CardHeader>
        <figure className="mx-auto size-44">
          <Image
            src={avatar.toDataUri()}
            alt={`Avatar of ${avatarName}`}
            width={256}
            height={256}
          />
        </figure>
      </CardHeader>

      <CardContent className="space-y-2">
        <FormItem>
          <Input placeholder={"CoolRat"} />
        </FormItem>

        <Button className="w-full" variant={"secondary"}>
          Choisir la liste de restaurant
        </Button>

        <Button className="w-full" disabled={cantCreateRoom}>
          <PlayIcon className="mr-2 size-4" />
          Créer ma room
        </Button>
      </CardContent>
    </Card>
  );
}
