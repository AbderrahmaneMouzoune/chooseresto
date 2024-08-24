"use client";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Card, CardContent, CardHeader } from "@components/ui/card";
import { FormItem } from "@components/ui/form";
import { Input } from "@components/ui/input";
import { micah } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { PlayIcon, ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useState } from "react";
import RoomLocalisation from "./room-localisation";

const possibleAvatar = [
  "Princess",
  "Abby",
  "Boo",
  "Loki",
  "Coco",
  "Cleo",
  "Buddy",
];

export default function RoomCreate() {
  const avatarName =
    possibleAvatar[(Math.random() * 100) % possibleAvatar.length];
  const avatar = createAvatar(micah, {
    seed: avatarName,
  });

  const [restaurants] = useState<string[] | undefined>(undefined);
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

        <Drawer>
          <RestaurantButton>
            {restaurants?.length === 0 && "Pas de resto trouvé, réessayer"}
            {restaurants &&
              restaurants.length > 0 &&
              `${restaurants.length} restaurants trouvé`}
            {restaurants === undefined && "Choisir la liste de restaurants"}
          </RestaurantButton>

          <RoomLocalisation />
        </Drawer>

        <Button className="w-full" disabled={cantCreateRoom}>
          <PlayIcon className="mr-2 size-4" />
          Créer ma room
        </Button>
      </CardContent>
    </Card>
  );
}

function RestaurantButton({
  isLoading = false,
  children,
}: Readonly<{
  children: React.ReactNode;
  isLoading?: boolean;
}>) {
  return (
    <DrawerTrigger asChild>
      <Button className="w-full" variant={"secondary"} disabled={isLoading}>
        {isLoading && <ReloadIcon className={"mr-2 size-4 animate-spin"} />}
        {children}
      </Button>
    </DrawerTrigger>
  );
}
