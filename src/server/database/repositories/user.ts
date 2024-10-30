import db from "@/server/database/db";

export enum Role {
  PATIENT = "PATIENT",
  RECEPTIONIST = "RECEPTIONIST",
  DENTIST = "DENTIST",
  ADMIN = "ADMIN",
}

interface UserProps {
  email: string;
  password: string;
  role: Role;
  name?: string;
}

export default class UserRepo {
  static findUserByEmail = async (email: string) => {
    return db.user.findUnique({
      where: { email },
    });
  };

  static createUser = async ({ email, password, role, name }: UserProps) => {
    return db.user.create({
      data: { email, password, role, name },
    });
  };

  static updateUserRole = async (userId: string, role: Role) => {
    return db.user.update({
      where: { id: userId },
      data: { role },
    });
  };

  static getUserById = async (userId: string) => {
    return db.user.findUnique({
      where: { id: userId },
    });
  };

  static getAllUsers = async () => {
    return db.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
      },
    });
  };
}
