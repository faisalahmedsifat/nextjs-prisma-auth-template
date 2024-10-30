"use server";

import UserRepo from "@/server/database/repositories/user";

interface UserProps {
  email: string;
  password: string;
}

export default async function SignupUseCase({ email, password }: UserProps) {
  const user = await UserRepo.findUserByEmail(email);
  if (user) {
    throw new Error("User already exists");
  }

  console.log("Creating user with email", email);

  return UserRepo.createUser(email, password);
}
