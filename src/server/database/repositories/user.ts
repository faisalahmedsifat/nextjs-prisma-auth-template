import db from "@/server/database/db";

export default class UserRepo {
  static findUserByEmail = async (email: string) => {
    return db.user.findFirst({
      where: {
        email,
      },
    });
  };

  static createUser = async (email: string, password: string) => {
    return db.user.create({
      data: {
        email,
        password,
      },
    });
  };
}
