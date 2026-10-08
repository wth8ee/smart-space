import { AmenityIcon } from "@/src/generated/prisma/enums";
import { prisma } from "./prisma";

export async function seedAmenities() {
  //   model Amenity {
  //   id    String @id
  //   icon  AmenityIcon
  //   name  String
  //   rooms Room[]
  // }
  const amenities = [
    {
      icon: AmenityIcon.WIFI,
      name: "WiFi",
    },
    {
      icon: AmenityIcon.MONITOR,
      name: "Монитор",
    },
    {
      icon: AmenityIcon.TVPANEL,
      name: "TV Панель",
    },
    {
      icon: AmenityIcon.PROJECTOR,
      name: "Проектор",
    },
    {
      icon: AmenityIcon.BOARD,
      name: "Доска",
    },
    {
      icon: AmenityIcon.STAGE,
      name: "Сцена",
    },
  ];

  for (const amenity of amenities) {
    try {
      await prisma.amenity.create({
        data: {
          icon: amenity.icon,
          name: amenity.name,
        },
      });
    } catch (err) {
      console.error(err);
    }
  }
}
