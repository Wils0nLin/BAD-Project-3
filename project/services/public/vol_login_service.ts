import pg from "pg";
import { checkPassword } from "../../utils/hash";
// import type { Knex } from "knex";

export class vol_login_service {
    constructor(private client: pg.Client) {}

    login = async (username: string, password: string) => {
        if (!username || !password) {
            throw new Error("missing username or password");
        }

        const queryResult = await this.client.query(
            /*SQL*/ `SELECT id, v_username, v_password FROM volunteers WHERE v_username = '${username}';`
        );
        const foundUser = queryResult.rows[0];
        
        // const foundUser = await this.knex("volunteers")
        //     .select("id", "username", "password")
        //     .where("username", username)
        //     .first();

        if (!foundUser) {
            throw new Error("invalid username or password");
        }

        if (!(await checkPassword(password, foundUser.v_password))) {
            throw new Error("invalid username or password");
        }
        return foundUser;
    };
}
