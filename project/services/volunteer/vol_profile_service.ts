// import pg from "pg";
import type { Knex } from "knex";

export class vol_profile_service {
    // constructor(private client: pg.Client) {}
    constructor(private knex: Knex) {}

    profile = async (volId: number) => {
        const vol_profile = await this.knex("volunteers").select().where("id", volId).first();

        return vol_profile;
    };

    profile_edit = async (
        volId: number,
        name: string,
        email: string,
        birth: Date,
        phone: string,
        address: string
    ) => {
        await this.knex("volunteers")
            .select()
            .update({
                v_name: name,
                v_email: email,
                v_birth_date: birth,
                v_phone_number: phone,
                v_address: address,
            })
            .where("id", volId);
    };
}
