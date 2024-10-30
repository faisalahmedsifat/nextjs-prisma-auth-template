import { NextRequest, NextResponse } from "next/server";
import UserRepo, { Role } from "@/server/database/repositories/user";
import withAuth from "@/lib/withAuth";

// GET: Retrieve all users (Admin only)
const getAllUsers = async () => {
  const users = await UserRepo.getAllUsers();
  return NextResponse.json(users, { status: 200 });
};

// POST: Register a new user (open to all)
const registerUser = async (req: NextRequest) => {
  const { email, password, name } = await req.json();
  const user = await UserRepo.createUser({
    email,
    password,
    role: Role.PATIENT,
    name,
  });
  return NextResponse.json(user, { status: 201 });
};

export default async function handler(req: NextRequest) {
  if (req.method === "GET") return withAuth(getAllUsers, "ADMIN")(req);
  if (req.method === "POST") return registerUser(req);
  return NextResponse.json(
    { success: false, message: "Method Not Allowed" },
    { status: 405 }
  );
}
