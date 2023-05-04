// import pg from "pg";
import type { Knex } from "knex";
import { checkPassword } from "../../utils/hash";

export class user_login_service {
    // constructor(private client: pg.Client) {}
    constructor(private knex: Knex) {}

    login = async (username: string, password: string) => {
        if (!username || !password) {
            throw new Error("missing username or password");
        }

        // const queryResult = await this.client.query(
        //     /*SQL*/ `SELECT id, v_username, v_password FROM volunteers WHERE v_username = '${username}';`
        // );
        // const vol_info = queryResult.rows[0];

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
}
