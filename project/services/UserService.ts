import { User } from "../model";
import { checkPassword } from "../utils/hash";
import type { Knex } from "knex";

export class UserService {
    constructor(private knex: Knex) {}

  login = async (username: string, password: string) => {
    if (!username || !password) {
      throw new Error("missing username or password");
    }

    // LIMIT 1
    const foundUser = await this.knex<User>("users")
      .select("id", "username", "password")
      .where("username", username)
      .first();

    if (!foundUser) {
      throw new Error("invalid username ");
    }

    if (!(await checkPassword(password, foundUser.password))) {
      throw new Error("invalid password ");
    }
  };
}