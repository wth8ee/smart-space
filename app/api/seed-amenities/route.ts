import { seedAmenities } from "@/lib/seed";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await seedAmenities();

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
