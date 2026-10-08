import { seedRooms } from "@/lib/seed-rooms";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await seedRooms();

    return NextResponse.json({
      success: true,
      message: "Amenities successfully seeded",
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      status: 500,
      error: "Идите нахуй: " + err.message,
    });
  }
}
