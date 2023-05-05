// import pg from "pg";
import type { Knex } from "knex";

export class vol_post_service {
    // constructor(private client: pg.Client) {}
    constructor(private knex: Knex) {}

    post = async (volId: number) => {
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
            .where("volunteer_id", volId)
            .andWhere("cats.is_shown", true)
            .orderBy("cats.id");

        return vol_post;
    };

    post_delete = async (postId: number) => {
        const vol_post = await this.knex("cats").select("cats.is_shown").where("cats.id", postId);

        if (vol_post) {
            await this.knex("cats").where("id", postId).update("is_shown", false);
        }
    };

    post_create = async (
        volId: number,
        name: string,
        gender: string,
        age: string,
        breed: string,
        character: string,
        health: string,
        habit: string,
        intro: string
    ) => {
        const vol_post = await this.knex("cats")
            .insert({
                volunteer_id: volId,
                c_name: name,
                age: age,
                gender: gender,
                breed: breed,
                character: character,
                cat_health: health,
                food_habits: habit,
                intro: intro,
            }).returning("id")

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
