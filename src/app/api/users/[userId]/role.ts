import { NextRequest, NextResponse } from "next/server";
import UserRepo from "@/server/database/repositories/user";
import withAuth from "@/lib/withAuth";

// PATCH: Assign role to user (Admin only)
const assignRole = async (req: NextRequest) => {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json(
      { success: false, message: "User ID is required" },
      { status: 400 }
    );
  }
  const { role } = await req.json();
  const updatedUser = await UserRepo.updateUserRole(userId, role);
  return NextResponse.json(updatedUser, { status: 200 });
};

export default withAuth(assignRole, "ADMIN");
