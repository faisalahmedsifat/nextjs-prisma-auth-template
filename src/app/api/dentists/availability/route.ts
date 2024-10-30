import { NextRequest, NextResponse } from "next/server";
import DentistAvailabilityRepo from "@/server/database/repositories/dentistAvailability";
import withAuth from "@/lib/withAuth";

// POST: Set availability (Dentist only)
const setAvailability = async (req: NextRequest) => {
  const { dentistId, dayOfWeek, startTime, endTime } = await req.json();
  const availability = await DentistAvailabilityRepo.setAvailability(
    dentistId,
    dayOfWeek,
    startTime,
    endTime
  );
  return NextResponse.json(availability, { status: 201 });
};

// GET: Get availability by dentist ID (Receptionist only)
const getAvailabilityByDentistId = async (req: NextRequest) => {
  const url = new URL(req.url);
  const dentistId = url.searchParams.get("dentistId");
  if (!dentistId) {
    return NextResponse.json(
      { success: false, message: "Dentist ID is required" },
      { status: 400 }
    );
  }
  const availability = await DentistAvailabilityRepo.getAvailabilityByDentist(
    dentistId
  );
  return NextResponse.json(availability, { status: 200 });
};

export default async function handler(req: NextRequest) {
  if (req.method === "POST") return withAuth(setAvailability, "DENTIST")(req);
  if (req.method === "GET")
    return withAuth(getAvailabilityByDentistId, "RECEPTIONIST")(req);
  return NextResponse.json(
    { success: false, message: "Method Not Allowed" },
    { status: 405 }
  );
}
