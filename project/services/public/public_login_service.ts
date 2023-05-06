import type { Knex } from "knex";
import { checkPassword } from "../../utils/hash";

export class public_login_service {
    constructor(private knex: Knex) {}

    user_login = async (username: string, password: string) => {
        if (!username || !password) {
            throw new Error("missing username or password");
        }

        const user_info = await this.knex("users")
            .select("id", "u_username", "u_password")
            .where("u_username", username)
            .first();

        if (!user_info) {
            throw new Error("invalid username or password");
        }

        if (!(await checkPassword(password, user_info.u_password))) {
            throw new Error("invalid username or password");
        }
        return user_info;
    };

    vol_login = async (username: string, password: string) => {
        if (!username || !password) {
            throw new Error("missing username or password");
        }

        const vol_info = await this.knex("volunteers")
            .select("id", "v_username", "v_password")
            .where("v_username", username)
            .first();

        if (!vol_info) {
            throw new Error("invalid username or password");
        }

        if (!(await checkPassword(password, vol_info.v_password))) {
            throw new Error("invalid username or password");
        }
        return vol_info;
    };
}
