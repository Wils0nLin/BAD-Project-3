import type { Knex } from "knex";

export class public_cat_service {
    constructor(private knex: Knex) {}

    cat = async () => {
        const public_cat = await this.knex("cats")
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
            .andWhere("cats.is_shown", true)
            .orderBy("cats.id");

        return public_cat;
    };

    cat_info = async (catId: number) => {
        const public_cat = await this.knex("cats")
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
                "cats.food_habits AS food_habits",
                "volunteers.v_name",
                "volunteers.v_email",
                "volunteers.v_phone_number"
            )
            .join("cat_image", "cat_image.cat_id", "=", "cats.id")
            .leftJoin("cat_video", "cat_video.cat_id", "=", "cats.id")
            .join("volunteers", "cats.volunteer_id", "=", "volunteers.id")
            .where("cats.id", catId)
            .groupBy(
                "cats.c_name",
                "cats.intro",
                "cats.age",
                "cats.gender",
                "cats.breed",
                "cats.character",
                "cats.cat_health",
                "cats.food_habits",
                "volunteers.v_name",
                "volunteers.v_email",
                "volunteers.v_phone_number"
            )
            .first();

        return public_cat;
    };
}
