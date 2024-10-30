import db from "@/server/database/db";

export default class TranscriptionRepo {
  static createTranscription = async (
    appointmentId: string,
    transcriptionText: string,
    summary: string
  ) => {
    return db.transcription.create({
      data: {
        appointmentId,
        transcriptionText,
        summary,
        isFinalized: false,
      },
    });
  };

  static updateTranscriptionSummary = async (
    appointmentId: string,
    summary: string
  ) => {
    return db.transcription.update({
      where: { appointmentId },
      data: { summary },
    });
  };

  static finalizeTranscription = async (appointmentId: string) => {
    return db.transcription.update({
      where: { appointmentId },
      data: { isFinalized: true },
    });
  };
}
