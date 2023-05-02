import { User, Vol } from "../model";
import { checkPassword } from "../utils/hash";
import type { Knex } from "knex";

export class UserLoginService {
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

export class VolLoginService {
    constructor(private knex: Knex) {}

    login = async (username: string, password: string) => {
        if (!username || !password) {
            throw new Error("missing username or password");
        }

        // LIMIT 1
        const foundVol = await this.knex<Vol>("users")
            .select("id", "username", "password")
            .where("username", username)
            .first();

        if (!foundVol) {
            throw new Error("invalid username ");
        }

        if (!(await checkPassword(password, foundVol.password))) {
            throw new Error("invalid password ");
        }
    };
}
