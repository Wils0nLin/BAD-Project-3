// import pg from "pg";
import type { Knex } from "knex";

export class vol_profile_service {
    // constructor(private client: pg.Client) {}
    constructor(private knex: Knex) {}

    profile = async (userid: number) => {
        // const queryResult = await this.client.query(
        //     /*SQL*/ `SELECT * FROM volunteers WHERE id = '${userid}';`
        // );
        // const vol_profile = queryResult.rows[0];

        const vol_profile = await this.knex("volunteers").select().where("id", userid).first();

        return vol_profile;
    };

    profile_edit = async (
        userid: number,
        name: string,
        email: string,
        birth_date: Date,
        phone_number: string,
        address: string
    ) => {
        // await this.client.query(
        //     /*SQL*/ `UPDATE volunteers SET v_name = '${name}',
        //             v_email = '${email}',
        //             v_birth_date = '${birth_date}',
        //             v_phone_number = '${phone_number}' ,
        //             v_address = '${address}'
        //             where id = '${userid}';`
        // );

        await this.knex("volunteers")
            .select()
            .update({
                v_name: name,
                v_email: email,
                v_birth_date: birth_date,
                v_phone_number: phone_number,
                v_address: address,
            })
            .where("id", userid);
    };
}
