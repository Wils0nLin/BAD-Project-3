// import pg from "pg";
import type { Knex } from "knex";

export class vol_post_service {
    // constructor(private client: pg.Client) {}
    constructor(private knex: Knex) {}

    post = async (userid: number) => {
        // const queryResult = await this.client.query(
        //     /*SQL*/ `WITH temp AS (SELECT MIN(id) AS id, cat_id FROM cat_image GROUP BY cat_id)
        //             SELECT volunteer_id, cats.id, c_name, intro, gender, cat_image.id AS c_image_id, cat_image.c_image FROM cats
        //             LEFT JOIN temp ON cats.id = temp.cat_id
        //             INNER JOIN cat_image ON temp.id = cat_image.id WHERE volunteer_id = ${userid} AND cats.is_shown = true`
        // );
        // const vol_post = queryResult.rows;

        const vol_post = await this.knex("cats")
            .select(
                "volunteer_id",
                "cats.id",
                "c_name",
                "intro",
                "gender",
                "cat_image.id AS c_image_id",
                "cat_image.c_image"
            )
            .leftJoin(
                this.knex
                    .select(this.knex.raw("MIN(id) as id, cat_id"))
                    .from("cat_image")
                    .groupBy("cat_id")
                    .as("post"),
                "cats.id",
                "post.cat_id"
            )
            .innerJoin("cat_image", "post.id", "cat_image.id")
            .where("volunteer_id", userid)
            .andWhere("cats.is_shown", true);

        return vol_post;
    };

    post_delete = async (postId: number) => {
        // const queryResult = await this.client.query(
        //     /*SQL*/ `SELECT cats.is_shown FROM cats where cats.id = '${postId}';`
        // );

        // if (queryResult) {
        //     await this.client.query(
        //         /*SQL*/ `UPDATE cats set is_shown = false where cats.id = '${postId}';`
        //     );
        // }

        const vol_post = await this.knex("cats").select("cats.is_shown").where("cats.id", postId);

        if (vol_post) {
            await this.knex("cats").where("id", postId).update("is_shown", false);
        }
    };

    post_create = async (
        userid: number,
        name: string,
        gender: string,
        age: string,
        breed: string,
        character: string,
        cat_health: string,
        habit: string,
        intro: string
    ) => {
        const vol_post = await this.knex("cats")
            .insert({
                volunteer_id: userid,
                c_name: name,
                age: age,
                gender: gender,
                breed: breed,
                character: character,
                cat_health: cat_health,
                food_habits: habit,
                intro: intro,
            })
            .first();

        return vol_post;
    };

    post_image = async (postId: number, img: string) => {
        await this.knex("cat_image").insert({
            cat_id: postId,
            c_image: img,
        });
    };

    post_video = async (postId: number, video: string) => {
        await this.knex("cat_video").insert({
            cat_id: postId,
            c_video: video,
        });
    };

    post_info = async (postId: number) => {
        const vol_post = await this.knex("cats")
            .select(
                this.knex.raw(`json_agg(cat_video.c_video) AS video`),
                this.knex.raw(`json_agg(cat_image.c_image) AS img`),
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
            .where("cats.id", postId)
            .groupBy(
                "cats.c_name",
                "cats.intro",
                "cats.age",
                "cats.gender",
                "cats.breed",
                "cats.character",
                "cats.cat_health",
                "cats.food_habits"
            )
            .first();

        return vol_post;
    };

    post_edit = async (
        catId: number,
        age: string,
        gender: string,
        breed: string,
        character: string,
        habit: string,
        health: string,
        intro: string
    ) => {
        await this.knex("cats")
            .select()
            .update({
                age: age,
                gender: gender,
                breed: breed,
                character: character,
                food_habits: habit,
                cat_health: health,
                intro: intro,
            })
            .where("id", catId);
    };
}
