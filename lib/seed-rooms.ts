import { AmenityIcon } from "@/src/generated/prisma/enums";
import { prisma } from "./prisma";
import { ROOMS } from "@/components/map/types";

export async function seedRooms() {
  // model Room {
  //   id           String @id
  //   name         String
  //   floor        Int
  //   capacity     Int
  //   pricePerHour Int
  //   x            Int
  //   y            Int
  //   w            Int
  //   h            Int
  //   amenities    Amenity[]
  // }

  const rooms = ROOMS.slice();

  for (const room of rooms) {
    try {
      await prisma.room.create({
        data: {
          id: room.id,
          name: room.name,
          floor: room.floor,
          capacity: room.capacity,
          pricePerHour: room.pricePerHour,
          x: room.x,
          y: room.y,
          w: room.w,
          h: room.h,
        },
      });
    } catch (err) {
      console.error(err);
    }
  }
}
