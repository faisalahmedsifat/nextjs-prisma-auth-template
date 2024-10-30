import { NextRequest, NextResponse } from "next/server";
import AppointmentRepo from "@/server/database/repositories/appointment";
import withAuth from "@/lib/withAuth";

// POST: Create a new appointment (Receptionist only)
const createAppointment = async (req: NextRequest) => {
  const { patientId, dentistId, startTime, endTime } = await req.json();
  const appointment = await AppointmentRepo.createAppointment(
    patientId,
    dentistId,
    startTime,
    endTime
  );
  return NextResponse.json(appointment, { status: 201 });
};

// GET: Retrieve all appointments (Admin only)
const getAllAppointments = async () => {
  const appointments = await AppointmentRepo.getAllAppointments();
  return NextResponse.json(appointments, { status: 200 });
};

export default async function handler(req: NextRequest) {
  if (req.method === "POST")
    return withAuth(createAppointment, "RECEPTIONIST")(req);
  if (req.method === "GET") return withAuth(getAllAppointments, "ADMIN")(req);
  return NextResponse.json(
    { success: false, message: "Method Not Allowed" },
    { status: 405 }
  );
}
