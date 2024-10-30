import db from "@/server/database/db";

export default class DocumentRepo {
  // Upload a new document
  static uploadDocument = async (
    patientId: string,
    appointmentId: string | null,
    documentUrl: string,
    type: string,
    uploadedById: string
  ) => {
    return db.document.create({
      data: {
        patientId,
        appointmentId,
        documentUrl,
        type,
        uploadedById,
      },
    });
  };

  // Get all documents by a patient's ID
  static getDocumentsByPatientId = async (patientId: string) => {
    return db.document.findMany({
      where: { patientId },
    });
  };

  // Get documents associated with a specific appointment
  static getDocumentsByAppointmentId = async (appointmentId: string) => {
    return db.document.findMany({
      where: { appointmentId },
    });
  };

  // Get documents uploaded by a specific user
  static getDocumentsByUploaderId = async (uploadedById: string) => {
    return db.document.findMany({
      where: { uploadedById },
    });
  };

  // Delete a document by its ID
  static deleteDocumentById = async (documentId: string) => {
    return db.document.delete({
      where: { id: documentId },
    });
  };
}
