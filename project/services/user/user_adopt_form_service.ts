// import { Client } from "pg";
import { Request } from "express";
import type { Knex } from "knex";

export class user_adopt_form_service {
    constructor(private knex: Knex) {}

    user_apply_status = async (req: Request) => {
        const queryResult = await this.knex
            .select(
                "cat_image.id AS img_id",
                "cat_image.c_image AS img",
                "adopt_forms.id AS form_id",
                "cats.c_name AS cat_name",
                "adopt_status AS adopt_status",
                this.knex.raw("ROW_NUMBER() over(partition by cats.c_name ORDER BY cats.c_name) n")
            )
            .from("cats")
            .join("adopt_forms", "cats.id", "=", "adopt_forms.cat_id")
            .join("users", "adopt_forms.user_id", "=", "users.id")
            .join("cat_image", "cat_image.cat_id", "=", "cats.id")
            .where("adopt_forms.user_id", req.session.userid)
            .as("x")
            .where("n", 1);
        return queryResult;
    };

    user_pending_case = async (req: Request) => {
        const queryResult = await this.knex
            .raw(`SELECT form_images.f_image,*, adopt_forms.id AS ad_id FROM adopt_forms
        INNER JOIN users
        ON users.id = adopt_forms.user_id
        INNER JOIN cats
        ON cats.id = adopt_forms.cat_id
        INNER JOIN cat_image
        ON cats.id = cat_image.cat_id
        JOIN form_images 
        ON form_images.adopt_forms_id = adopt_forms.id;`);

        return queryResult.rows;
    };

    user_get_event = async (req: Request) => {
        const queryResult = await this.knex.raw(
            `SELECT * from events where adopt_forms_id = ${req.params.caseID} AND is_select = 'true' ORDER BY date`
        );
        return queryResult.rows;
    };

    user_adopt_form = async (req: Request) => {
        const queryResult = await this.knex("cats")
            .select("*", "cats.id")
            .join("cat_image", "cats.id", "=", "cat_image.cat_id")
            .where("cats.id", req.params.id);
        return queryResult;
    };
}

// export class user_adopt_form_service {
//     constructor(private dbClient: Client) {}
//     user_apply_status = async (req: Request) => {
//         const queryResult = await this.dbClient.query(
//             `select *
//             from (
//                   select
//                         cat_image.id AS img_id,
//                         cat_image.c_image AS img,
//                         adopt_forms.id AS form_id,
//                         cats.c_name AS cat_name,
//                         adopt_status AS adopt_status,
//                         ROW_NUMBER() over(
//                               partition by cats.c_name
//                               ORDER BY cats.c_name
//                         ) n
//                   from cats
//                   JOIN adopt_forms ON cats.id = adopt_forms.cat_id
//                   JOIN users ON adopt_forms.user_id = users.id
//                   JOIN cat_image on cat_image.cat_id = cats.id
//                   where adopt_forms.user_id = ${req.session.userid}
//             ) x
//             where n = 1
//             ;`
//         );
//         return queryResult.rows;
//     };

//     user_pending_case = async (req: Request) => {
//         const queryResult = await this.dbClient.query(
//             `SELECT form_images.f_image,*, adopt_forms.id AS ad_id FROM adopt_forms
//                 INNER JOIN users
//                 ON users.id = adopt_forms.user_id
//                 INNER JOIN cats
//                 ON cats.id = adopt_forms.cat_id
//                 INNER JOIN cat_image
//                 ON cats.id = cat_image.cat_id
//                 JOIN form_images
//                 ON form_images.adopt_forms_id = adopt_forms.id;`
//         );
//         return queryResult.rows;
//     };

//     user_get_event = async (req: Request) => {
//         const queryResult = await this.dbClient.query(
//             `SELECT * from events where adopt_forms_id = ${req.params.caseID} AND is_select = 'true' ORDER BY date`
//         );
//         return queryResult.rows;
//     };

//     user_adopt_form = async (req: Request) => {
//         const queryResult = await this.dbClient.query(
//             `SELECT *,cats.id FROM cats
//             INNER JOIN cat_image
//             ON cats.id = cat_image.cat_id
//             WHERE cats.id = ${req.params.id}; `
//         );
//         return queryResult.rows;
//     };
// }
