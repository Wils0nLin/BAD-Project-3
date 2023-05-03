import pg from "pg";
import { checkPassword } from "../../utils/hash";
// import type { Knex } from "knex";

export class vol_login_service {
    constructor(private client: pg.Client) {}
    // constructor(private knex: Knex) {}

    login = async (username: string, password: string) => {
        if (!username || !password) {
            throw new Error("missing username or password");
        }

        const queryResult = await this.client.query(
            /*SQL*/ `SELECT id, v_username, v_password FROM volunteers WHERE v_username = '${username}';`
        );
        const vol_info = queryResult.rows[0];
        
        // const vol_info = await this.knex("volunteers")
        //     .select("id", "v_username", "v_password")
        //     .where("v_username", username)
        //     .first();

        if (!vol_info) {
            throw new Error("invalid username or password");
        }

        if (!(await checkPassword(password, vol_info.v_password))) {
            throw new Error("invalid username or password");
        }
        return vol_info;
    };
}
