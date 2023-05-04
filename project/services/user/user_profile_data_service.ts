import type { Knex } from "knex";
import { Request } from "express";

export class user_profile_data_service {
    constructor(private knex: Knex) {}

    user_get_profile = async (req: Request) => {
        const queryResult = await this.knex("users")
            .select("users.*", "income.income_value", "home_size.home_size")
            .join("income", "users.income_id", "=", "income.id")
            .join("home_size", "users.home_size_id", "=", "home_size.id")
            .where("u_username", req.session.username)
            .first();

        return queryResult;
    };

    user_update_profile = async (
        postId: number,
        v_name: string,
        v_email: string,
        v_birth_date: string,
        v_phone_number: string,
        v_address: string
    ) => {
        await this.knex.raw(
            `UPDATE volunteers SET v_name = $1, v_email = $2 ,v_birth_date = $3, v_phone_number = $4 , v_address = $5 where id = $6`,
            [v_name, v_email, v_birth_date, v_phone_number, v_address, postId]
        );
    };
}

////舊野
// import { Client } from "pg";
// import { User } from "../../model";
// import { Request } from "express";

// export class user_profile_data_service {
//     constructor(private dbClient: Client) {}

//     user_get_profile = async (req: Request) => {
//         const queryResult = await this.dbClient.query<User>(
//             `SELECT users.* , income_value, home_size FROM users
//                 JOIN income ON users.income_id = income.id
//                 JOIN home_size ON users.home_size_id = home_size.id
//             WHERE u_username = '${req.session.username}'`
//         );
//         return queryResult.rows[0];
//     };

//     user_update_profile = async (
//         postId: number,
//         v_name: string,
//         v_email: string,
//         v_birth_date: string,
//         v_phone_number: string,
//         v_address: string
//     ) => {
//         await this.dbClient.query(
//             `UPDATE volunteers SET v_name = $1, v_email = $2 ,v_birth_date = $3, v_phone_number = $4 , v_address = $5 where id = $6`,
//             [v_name, v_email, v_birth_date, v_phone_number, v_address, postId]
//         );
//     };
// }
////
