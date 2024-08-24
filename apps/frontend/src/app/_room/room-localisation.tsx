"use client";

import { LoaderButton } from "@/components/ui/loader-button";
import { useToast } from "@/components/ui/use-toast";
import useGeoLocation from "@/lib/hooks/use-geolocation";
import { Button } from "@components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin } from "lucide-react";
import type { MouseEventHandler } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import { getPlacesFromAddressAction } from "./action";

const geocodeLocationSchema = z.object({
  address: z.string().min(5).max(100),
});

interface RoomLocalisationProps {
  updateLocation({ lat, lon }: { lat: number; lon: number }): void;
}

export default function RoomLocalisation({
  updateLocation,
}: RoomLocalisationProps) {
  const { toast } = useToast();
  const [places, setPlaces] = useState<GeocodeMaps[]>([]);

  const { execute, isPending } = useServerAction(getPlacesFromAddressAction, {
    onSuccess({ data }) {
      setPlaces(data);
    },
    onError({ err }) {
      toast({
        title: "Oops une erreur...",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const { getLocation, error } = useGeoLocation((location) => {
    if (location.latitude !== null && location.longitude !== null) {
      updateLocation({
        lat: location.latitude,
        lon: location.longitude,
      });
    }
  });

  if (error) {
    toast({
      title: "Oops une erreur...",
      description: error,
      variant: "destructive",
    });
  }

  const form = useForm<z.infer<typeof geocodeLocationSchema>>({
    resolver: zodResolver(geocodeLocationSchema),
    defaultValues: {
      address: "",
    },
  });

  function onSubmit(values: z.infer<typeof geocodeLocationSchema>) {
    execute(values);
  }

  return (
    <DrawerContent className="p-4">
      <DrawerHeader>
        <DrawerTitle>Entrez votre localisation</DrawerTitle>
      </DrawerHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Localisation</FormLabel>
                <FormControl>
                  <Input placeholder="Entrer votre localisation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoaderButton className="w-full" type="submit" isLoading={isPending}>
            Valider mon adresse
          </LoaderButton>
        </form>
      </Form>

      <DrawerClose asChild>
        <Button variant="outline" className="mt-2 w-full" onClick={getLocation}>
          <MapPin className="mr-2 size-5" />
          Ou utilisé ma position
        </Button>
      </DrawerClose>

      {places.length > 0 && (
        <DrawerFooter>
          <ul className="mt-2 space-y-1 overflow-auto">
            {places.map((place) => (
              <Place
                key={place.place_id}
                props={place}
                onClick={() =>
                  updateLocation({
                    lat: Number(place.lat),
                    lon: Number(place.lon),
                  })
                }
              />
            ))}
          </ul>
        </DrawerFooter>
      )}
    </DrawerContent>
  );
}

function Place({
  props,
  onClick,
}: {
  props: Pick<GeocodeMaps, "display_name">;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <DrawerClose asChild>
      <Button className="h-fit whitespace-normal" onClick={onClick}>
        {props.display_name}
      </Button>
    </DrawerClose>
  );
}
