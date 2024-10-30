import db from "@/server/database/db";

export default class AppointmentRepo {
  static createAppointment = async (
    patientId: string,
    dentistId: string,
    receptionistId: string | null,
    startTime: Date,
    endTime: Date
  ) => {
    return db.appointment.create({
      data: {
        patientId,
        dentistId,
        receptionistId,
        startTime,
        endTime,
        status: "SCHEDULED",
      },
    });
  };

  static updateAppointmentStatus = async (
    appointmentId: string,
    status: "SCHEDULED" | "ONGOING" | "COMPLETED"
  ) => {
    return db.appointment.update({
      where: { id: appointmentId },
      data: { status },
    });
  };

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

  static getAppointmentById = async (appointmentId: string) => {
    return db.appointment.findUnique({
      where: { id: appointmentId },
      include: { documents: true, transcription: true },
    });
  };
}
