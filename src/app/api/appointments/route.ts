import { NextResponse } from "next/server";
import { initialAppointments } from "@/types/appointments.types";

export async function GET() {
  // Simulating fetching data from a database
  return NextResponse.json(initialAppointments);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // TODO: Validate data and save to database
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to process request" }, { status: 400 });
  }
}
