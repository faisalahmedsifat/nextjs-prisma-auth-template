import { NextRequest, NextResponse } from "next/server";
import AppointmentRepo from "@/server/database/repositories/appointment";
import withAuth from "@/lib/withAuth";

// GET: Retrieve appointment by ID
const getAppointmentById = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const appointmentId = searchParams.get("appointmentId");
  if (!appointmentId) {
    return NextResponse.json(
      { success: false, message: "Appointment ID is required" },
      { status: 400 }
    );
  }
  const appointment = await AppointmentRepo.getAppointmentById(appointmentId);
  return NextResponse.json(appointment, { status: 200 });
};

const updateAppointmentStatus = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const appointmentId = searchParams.get("appointmentId");
  if (!appointmentId) {
    return NextResponse.json(
      { success: false, message: "Appointment ID is required" },
      { status: 400 }
    );
  }
  const { status } = await req.json();
  const updatedAppointment = await AppointmentRepo.updateAppointmentStatus(
    appointmentId,
    status
  );
  return NextResponse.json(updatedAppointment, { status: 200 });
};

export default async function handler(req: NextRequest) {
  if (req.method === "GET")
    return withAuth(getAppointmentById, "RECEPTIONIST")(req);
  if (req.method === "PATCH")
    return withAuth(updateAppointmentStatus, "DENTIST")(req);
  return NextResponse.json(
    { success: false, message: "Method Not Allowed" },
    { status: 405 }
  );
}
