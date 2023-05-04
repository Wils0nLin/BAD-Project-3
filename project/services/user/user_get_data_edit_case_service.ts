import { Request } from "express";
import { Knex } from "knex";

export class user_get_data_edit_case_service {
    constructor(private knex: Knex) {}

    update_cat_profile = async (
        caseId: number,
        age: number,
        gender: string,
        breed: string,
        characters: string,
        food_habits: string,
        cat_health: string,
        intro: string
    ) => {
        await this.knex("cats").update({
            age,
            gender,
            breed,
            characters,
            food_habits,
            cat_health,
            intro,
            caseId,
        });
    };

    get_data_edit_case = async (req: Request) => {
        const queryResult = await this.knex("cats")
            .select(
                this.knex.raw("json_agg(cat_video.c_video) AS video"),
                this.knex.raw("json_agg(cat_image.c_image) AS img"),
                "cats.c_name AS cat_name",
                "cats.intro AS intro",
                "cats.age AS age",
                "cats.gender AS gender",
                "cats.breed AS breed",
                "cats.character AS characters",
                "cats.cat_health AS cat_health",
                "cats.food_habits AS food_habits"
            )
            .join("cat_image", "cat_image.cat_id", "=", "cats.id")
            .leftJoin("cat_video", "cat_video.cat_id", "=", "cats.id")
            .where("cats.id", req.params.caseId)
            .groupBy(
                "cats.c_name",
                "cats.intro",
                "cats.age",
                "cats.gender",
                "cats.breed",
                "cats.character",
                "cats.cat_health",
                "cats.food_habits"
            );

        return queryResult[0];
    };
}

////舊野
// import { Client } from "pg";
// export class user_get_data_edit_case_service {
//     constructor(private knex: Knex) {}

//     update_cat_profile = async (
//         caseId: number,
//         age: number,
//         gender: string,
//         breed: string,
//         characters: string,
//         food_habits: string,
//         cat_health: string,
//         intro: string
//     ) => {
//         await this.dbClient.query(
//             `UPDATE cats SET  age  = $1, gender = $2 , breed = $3 , character = $4, food_habits  = $5, cat_health = $6 , intro = $7 where id  = $8`,
//             [age, gender, breed, characters, food_habits, cat_health, intro, caseId]
//         );
//     };

// get_data_edit_case = async (req: Request) => {
//     const queryResult = await this.dbClient.query(
//         `SELECT
//     json_agg(cat_video.c_video) AS video,
//     json_agg(cat_image.c_image) AS img,
//     cats.c_name AS cat_name,
//     cats.intro AS intro,
//     cats.age AS age,
//     cats.gender AS gender,
//     cats.breed AS breed,
//     cats.character AS characters,
//     cats.cat_health AS cat_health,
//     cats.food_habits AS food_habits
//     from cats
//     JOIN cat_image on cat_image.cat_id = cats.id
//     LEFT JOIN cat_video on cat_video.cat_id = cats.id
//     where cats.id =${req.params.caseId}
//     GROUP BY
//     cats.c_name,
//     cats.intro,
//     cats.age,
//     cats.gender,
//     cats,breed,
//     cats.character,
//     cats.cat_health,
//     cats.food_habits
//     ;`
//     );

//     return queryResult.rows[0];
// };
// }
////
