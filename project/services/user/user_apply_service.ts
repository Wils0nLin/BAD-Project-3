import type { Knex } from "knex";

export class user_apply_service {
    constructor(private knex: Knex) {}

    apply_submit = async (catId: number, userId: number) => {
        const user_apply = await this.knex("adopt_forms")
            .insert({ cat_id: catId, user_id: userId, adopt_status: "pending" })
            .returning("id");
        return user_apply;
    };

    apply_image = async (applyID: number, img: string) => {
        await this.knex("form_images")
            .insert({ adopt_forms_id: applyID, f_image: img })
            .returning("id");
    };

    application = async (userId: number) => {
        const user_apply = await this.knex.raw(`SELECT *
        FROM (
            SELECT 
            cat_image.id AS img_id,
            cat_image.c_image AS img,
            adopt_forms.id AS form_id,
            cats.c_name AS cat_name,
            adopt_status AS adopt_status,
            ROW_NUMBER() over(
                partition BY cats.c_name
                ORDER BY cats.c_name
                ) n
            FROM cats 
            JOIN adopt_forms ON cats.id = adopt_forms.cat_id
            JOIN users ON adopt_forms.user_id = users.id
            JOIN cat_image on cat_image.cat_id = cats.id 
            WHERE adopt_forms.user_id = ${userId}
            ) x
            WHERE n = 1;
        `);
        return user_apply.rows;
    };

    apply_info = async (applyId: number) => {
        const user_apply = await this.knex.raw(`SELECT * 
        FROM (
            SELECT
            events.is_shown, 
            events.id,
            events.date,
            events.time,
            cats.age,
            cats.gender,
            cats.c_name,
            cat_image.c_image,
            cats.breed AS breed,
            events.event,
            ROW_NUMBER() over( 
                partition BY events.id 
                ORDER BY events.id 
                ) n
            FROM events
            JOIN adopt_forms ON adopt_forms_id = adopt_forms.id
            JOIN cats ON cats.id = adopt_forms.cat_id
            JOIN cat_image ON cat_image.cat_id = cats.id 
            WHERE adopt_forms_id = ${applyId}
            ) x
            WHERE n = 1;
        `);
        return user_apply.rows;
    };

    apply_event = async (applyId: number) => {
        const user_apply = await this.knex("events")
            .select()
            .where("adopt_forms_id", applyId)
            .andWhere("is_select", "true")
            .orderBy("date");
        return user_apply;
    };

    apply_edit = async (applyId: number, dateId: number) => {
        console.log(dateId);
        await this.knex("events").select().update({ is_select: "1" }).where("id", dateId);

        await this.knex("events")
            .select()
            .update({ is_shown: "0" })
            .where("adopt_forms_id", applyId);
    };
}
