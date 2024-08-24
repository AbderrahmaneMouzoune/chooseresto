"use client";

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
import useGeoLocation from "@hooks/use-geolocation";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  address: z.string().min(5).max(100),
});

export default function RoomLocalisation() {
  const [places, setPlaces] = useState<GeocodeMaps[]>([]);
  const { updateLocation, getLocation } = useGeoLocation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetch(`/api/map/address?address=${values.address}`)
      .then((response) => {
        if (!response.ok)
          throw new Error(
            "Une erreur est survenue pour essayer de récupérer l'adress",
          );
        return response.json();
      })
      .then((data) => {
        toast.success(
          `${data.length} possible adresse récupéré veuillez choisir la bonne`,
        );
        setPlaces(data);
      })
      .catch((error) => {
        toast.error(`Une erreur est survenu`);
        console.error("Erreur survenu ", error);
      });
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
          <Button className="w-full" type="submit">
            Valider mon addresse
          </Button>
        </form>
      </Form>

      <DrawerClose asChild>
        <Button variant="outline" className="mt-2 w-full" onClick={getLocation}>
          <MapPin className="mr-2 size-5" />
          Ou utilisé ma position
        </Button>
      </DrawerClose>

      <DrawerFooter>
        {places.length > 0 && (
          <ul className="mt-2 space-y-1 overflow-auto">
            {places.map((place) => (
              <DrawerClose key={place.place_id} asChild>
                <Button
                  className="h-fit whitespace-normal"
                  onClick={() => {
                    if (Number(place.lat) && Number(place.lon)) {
                      updateLocation({
                        longitude: Number(place.lon),
                        latitude: Number(place.lat),
                      });
                    }
                  }}
                >
                  {place.display_name}
                </Button>
              </DrawerClose>
            ))}
          </ul>
        )}
      </DrawerFooter>
    </DrawerContent>
  );
}
