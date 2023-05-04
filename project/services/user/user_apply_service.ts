// import { User } from "../../model";
import type { Knex } from "knex";
export class user_apply_service {
    constructor(private knex: Knex) {}

    user_apply = async (cat_id: any, user_id: any) => {
        await this.knex("adopt_forms")
            .insert({ cat_id: cat_id, user_id: user_id, adopt_status: "pending" })
            .returning("id");
    };

    user_apply_for = async (adopt_forms_id: number, f_image: string) => {
        await this.knex("for_images").insert({ adopt_forms_id, f_image }).returning("id");
    };
}
////舊野
// import { Client } from "pg";

// export class user_apply_service {
//     constructor(private dbClient: Client) {}

//     user_apply = async (cat_id: any, user_id: any) => {
//         const queryResult = await this.dbClient.query(
//             `INSERT INTO adopt_forms (cat_id,user_id,adopt_status) VALUES ($1,$2,'pending') RETURNING id`,
//             [cat_id, user_id]
//         );

//         // for (let i = 0; i < imgArr.length; i++) {
//         // const img = imgArr[i].newFilename
//         // }
//         return queryResult;
//     };

//     user_apply_for = async (id: number, img: string) => {
//         await this.dbClient.query(
//             `INSERT INTO form_images (adopt_forms_id,f_image) VALUES ($1,$2)`,
//             [id, img]
//         );
//     };
// }
////
