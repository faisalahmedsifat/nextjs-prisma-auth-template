// lib/types/AuthRequest.ts
import { Role } from "@/server/database/repositories/user";
import { NextRequest } from "next/server";

export interface AuthRequest extends NextRequest {
  userId?: string;
  role?: Role;
}
