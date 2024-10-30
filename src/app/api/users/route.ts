import { NextRequest, NextResponse } from "next/server";
import UserRepo, { Role } from "@/server/database/repositories/user";
import withAuth from "@/lib/withAuth";

// GET: Retrieve all users (Admin Only)
const getAllUsers = async () => {
  const users = await UserRepo.getAllUsers();
  return NextResponse.json(users, { status: 200 });
};

// POST: Register a new user
const registerUser = async (req: NextRequest) => {
  try {
    const { email, password, name } = await req.json();
    const user = await UserRepo.createUser({
      email,
      password,
      role: Role.PATIENT,
      name,
    });
    return NextResponse.json(user, { status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "User registration failed." },
      { status: 500 }
    );
  }
};

// Export default function to handle methods
export default async function handler(req: NextRequest) {
  if (req.method === "GET") return withAuth(getAllUsers, Role.ADMIN)(req);
  if (req.method === "POST") return registerUser(req);

  return NextResponse.json(
    { success: false, message: "Method Not Allowed" },
    { status: 405 }
  );
}
