import type { Knex } from "knex";
import { Request } from "express";

export class user_profile_data_service {
    constructor(private knex: Knex) {}

    user_get_profile = async (req: Request) => {
        console.log(req.session.userid);

        const queryResult = await this.knex("users")
            .select("users.*", "income.income_value", "home_size.home_size")
            .join("income", "users.income_id", "=", "income.id")
            .join("home_size", "users.home_size_id", "=", "home_size.id")
            .where("users.id", req.session.userid);
        console.log("bye");
        return queryResult[0];
    };

    user_update_profile = async (
        u_name: string,
        u_email: string,
        u_birth_date: Date,
        u_phone_number: string,
        u_address: string,
        // u_password: string,
        // u_username: string,
        home_size_id: number,
        income_id: number,
        pet_before: boolean,
        existed_pet: boolean,
        smoker: boolean,
        is_allergy: boolean,
        knowledge: string,
        future_plan: string,
        postId: number
    ) => {
        const obj = {
            u_name: u_name,
            u_email: u_email,
            u_birth_date: u_birth_date,
            u_phone_number: u_phone_number,
            u_address: u_address,
            // u_password: u_password,
            // u_username: u_username,
            home_size_id: home_size_id,
            income_id: income_id,
            pet_before: pet_before,
            existed_pet: existed_pet,
            smoker: smoker,
            is_allergy: is_allergy,
            knowledge: knowledge,
            future_plan: future_plan,
            postId: postId,
        };
        console.log(obj);
        await this.knex("users").where("id", postId).update({
            u_name: u_name,
            u_email: u_email,
            u_birth_date: u_birth_date,
            u_phone_number: u_phone_number,
            u_address: u_address,
            // u_password: u_password,
            // u_username: u_username,
            home_size_id: home_size_id,
            income_id: income_id,
            pet_before: pet_before,
            existed_pet: existed_pet,
            smoker: smoker,
            is_allergy: is_allergy,
            knowledge: knowledge,
            future_plan: future_plan,
        });
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
