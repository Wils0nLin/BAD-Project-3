import type { Knex } from "knex";
// import { Client } from "pg";

export class user_cat_adopt_service {
    constructor(private knex: Knex) {}

    get_all_cat = async () => {
        const queryResult = await this.knex.raw(
            `WITH temp AS (
        SELECT MIN(id) AS id, cat_id FROM cat_image GROUP BY cat_id
    )
    SELECT cats.id, c_name, intro, cats.gender, cat_image.id AS c_image_id, cat_image.c_image FROM cats 
    LEFT JOIN temp ON cats.id = temp.cat_id
    INNER JOIN cat_image ON temp.id = cat_image.id where cats.is_shown = true;`
        );
        return queryResult.rows;
    };

    get_cat_detail = async (postId: number) => {
        const queryResult = await this.knex.raw(
            `SELECT cats.* , cat_image.c_image , cat_video.c_video, volunteers.v_name, volunteers.v_email , volunteers.v_phone_number  FROM cats 
      JOIN cat_image ON cats.id = cat_image.cat_id 
      LEFT JOIN cat_video ON cats.id = cat_video.cat_id
      JOIN volunteers ON cats.volunteer_id = volunteers.id
      where cats.id = $1;`,
            [postId]
        );
        return queryResult.rows[0];
    };
}

////舊野
// export class user_cat_adopt_service {
//     constructor(private dbClient: Client) {}

//     get_all_cat = async () => {
//         const queryResult = await this.dbClient.query(
//             `WITH temp AS (
//         SELECT MIN(id) AS id, cat_id FROM cat_image GROUP BY cat_id
//     )
//     SELECT cats.id, c_name, intro, cats.gender, cat_image.id AS c_image_id, cat_image.c_image FROM cats
//     LEFT JOIN temp ON cats.id = temp.cat_id
//     INNER JOIN cat_image ON temp.id = cat_image.id where cats.is_shown = true;`
//         );
//         return queryResult.rows;
//     };

//     get_cat_detail = async (postId: number) => {
//         const queryResult = await this.dbClient.query(
//             `SELECT cats.* , cat_image.c_image , cat_video.c_video, volunteers.v_name, volunteers.v_email , volunteers.v_phone_number  FROM cats
//       JOIN cat_image ON cats.id = cat_image.cat_id
//       LEFT JOIN cat_video ON cats.id = cat_video.cat_id
//       JOIN volunteers ON cats.volunteer_id = volunteers.id
//       where cats.id = $1;`,
//             [postId]
//         );
//         return queryResult.rows[0];
//     };
// }
////
