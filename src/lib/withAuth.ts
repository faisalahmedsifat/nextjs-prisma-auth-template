// lib/withAuth.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { AuthRequest } from "@/lib/types/AuthRequest";
import { Role } from "@/server/database/repositories/user";

export default function withAuth(
  handler: (req: AuthRequest) => Promise<NextResponse>,
  requiredRole?: string
) {
  return async (req: AuthRequest) => {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Check for authentication
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check for role if required
    if (requiredRole && token.role !== requiredRole) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    // Set userId and role on the request object
    req.userId = token.sub;
    req.role = token.role as Role;

    return handler(req);
  };
}
