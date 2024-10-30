import db from "@/server/database/db";

export default class AppointmentRepo {
  // Create a new appointment with required data only
  static createAppointment = async (
    patientId: string,
    dentistId: string,
    startTime: Date,
    endTime: Date
  ) => {
    return db.appointment.create({
      data: {
        patientId,
        dentistId,
        startTime,
        endTime,
        status: "SCHEDULED",
      },
    });
  };

  // Update appointment status by appointment ID
  static updateAppointmentStatus = async (
    appointmentId: string,
    status: "SCHEDULED" | "ONGOING" | "COMPLETED"
  ) => {
    return db.appointment.update({
      where: { id: appointmentId },
      data: { status },
    });
  };

  // Get all appointments for a specific user
  static getAppointmentsForUser = async (userId: string) => {
    return db.appointment.findMany({
      where: {
        OR: [
          { patientId: userId },
          { dentistId: userId },
          { receptionistId: userId },
        ],
      },
    });
  };

  // Get an appointment by its ID, including related documents and transcription
  static getAppointmentById = async (appointmentId: string) => {
    return db.appointment.findUnique({
      where: { id: appointmentId },
      include: { documents: true, transcription: true },
    });
  };

  // Get all appointments (for Admin use)
  static getAllAppointments = async () => {
    return db.appointment.findMany({
      include: {
        patient: true, // Include patient details
        dentist: true, // Include dentist details
        receptionist: true, // Optionally include receptionist details, if available
        documents: true, // Include related documents
        transcription: true, // Include related transcription, if available
      },
    });
  };
}
