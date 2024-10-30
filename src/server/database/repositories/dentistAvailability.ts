import db from "@/server/database/db";

export default class DentistAvailabilityRepo {
  static setAvailability = async (
    dentistId: string,
    dayOfWeek:
      | "MONDAY"
      | "TUESDAY"
      | "WEDNESDAY"
      | "THURSDAY"
      | "FRIDAY"
      | "SATURDAY"
      | "SUNDAY",
    startTime: Date,
    endTime: Date
  ) => {
    return db.dentistAvailability.create({
      data: {
        dentistId,
        dayOfWeek,
        startTime,
        endTime,
      },
    });
  };

  static getAvailabilityByDentist = async (dentistId: string) => {
    return db.dentistAvailability.findMany({
      where: { dentistId },
    });
  };
}
