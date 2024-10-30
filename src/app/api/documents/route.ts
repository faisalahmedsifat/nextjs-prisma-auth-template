import { NextRequest, NextResponse } from "next/server";
import DocumentRepo from "@/server/database/repositories/document";
import withAuth from "@/lib/withAuth";

// POST: Upload a document (Receptionist only)
const uploadDocument = async (req: NextRequest) => {
  const { patientId, appointmentId, documentUrl, type, uploadedById } =
    await req.json();
  const document = await DocumentRepo.uploadDocument(
    patientId,
    appointmentId,
    documentUrl,
    type,
    uploadedById
  );
  return NextResponse.json(document, { status: 201 });
};

// GET: Retrieve documents by patient ID (Receptionist only)
const getDocumentsByPatientId = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const patientId = searchParams.get("patientId");
  if (!patientId) {
    return NextResponse.json(
      { success: false, message: "Patient ID is required" },
      { status: 400 }
    );
  }
  const documents = await DocumentRepo.getDocumentsByPatientId(patientId);
  return NextResponse.json(documents, { status: 200 });
};

export default async function handler(req: NextRequest) {
  if (req.method === "POST")
    return withAuth(uploadDocument, "RECEPTIONIST")(req);
  if (req.method === "GET")
    return withAuth(getDocumentsByPatientId, "RECEPTIONIST")(req);
  return NextResponse.json(
    { success: false, message: "Method Not Allowed" },
    { status: 405 }
  );
}
