import type { Knex } from "knex";

export class vol_case_service {
    constructor(private knex: Knex) {}

    case = async (userid: number) => {
        const vol_case = await this.knex.raw(`select *
        from (
            select 
            cat_image.id AS img_id,
            cat_image.c_image AS img,
            adopt_forms.id AS form_id,
            cats.c_name AS cat_name,
            adopt_status AS adopt_status,
            ROW_NUMBER() over(
                partition by cats.c_name
                ORDER BY cats.c_name
                ) n
            from cats 
            JOIN adopt_forms ON cats.id = adopt_forms.cat_id
            JOIN users ON adopt_forms.user_id = users.id
            JOIN cat_image on cat_image.cat_id = cats.id 
            where cats.volunteer_id = ${userid}
            ) x
            where n = 1;
        `);
        return vol_case;
    };

    case_info = async (caseId: number) => {
        const vol_case = await this.knex
            .raw(`SELECT form_images.f_image, *, adopt_forms.id AS ad_id FROM adopt_forms
        INNER JOIN users
        ON users.id = adopt_forms.user_id
        INNER JOIN cats
        ON cats.id = adopt_forms.cat_id
        INNER JOIN cat_image
        ON cats.id = cat_image.cat_id
        JOIN form_images 
        ON form_images.adopt_forms_id = adopt_forms.id
        WHERE adopt_forms_id = ${caseId})x
            where n = 1
        `);
        return vol_case;
    };

    case_accept = async (caseId: number) => {
        await this.knex("adopt_forms").where("id", caseId).update("adopt_status", "ACCEPT");
    };

    case_reject = async (caseId: number) => {
        await this.knex("adopt_forms").where("id", caseId).update("adopt_status", "REJECT");
    };

    case_event = async (caseId: number) => {
        const vol_case = await this.knex("events")
            .select()
            .where("adopt_forms_id", caseId)
            .andWhere("is_select", "true")
            .orderBy("date");
        return vol_case;
    };

    case_edit = async (caseId: number, date: any, time: any, event: string) => {
        await this.knex("events").select().update({
            adopt_forms_id: caseId,
            date: date,
            time: time,
            event: event,
        });
    };
}
