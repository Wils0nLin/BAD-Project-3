import type { Knex } from "knex";

export class public_forgot_service {
    constructor(private knex: Knex) {}

    user_forgot = async (username: string, phone: string, email: string) => {
        if (!username || !phone || !email) {
            throw new Error("missing information");
        }

        const user_info = await this.knex("users")
            .select("id", "u_username", "u_phone_number", "u_email")
            .where("u_username", username)
            .andWhere("u_phone_number", phone)
            .andWhere("u_email", email)
            .first();

        if (!user_info) {
            throw new Error("invalid information");
        }

        return user_info;
    };

    vol_forgot = async (username: string, phone: string, email: string) => {
        if (!username || !phone || !email) {
            throw new Error("missing information");
        }

        const vol_info = await this.knex("volunteers")
            .select("id", "v_username", "v_phone_number", "v_email")
            .where("v_username", username)
            .andWhere("v_phone_number", phone)
            .andWhere("v_email", email)
            .first();

        if (!vol_info) {
            throw new Error("invalid information");
        }

        return vol_info;
    };

    user_reset = async (userId: number, password: string) => {
        await this.knex("users")
            .select()
            .update({
                u_password: password,
            })
            .where("id", userId);
    };

    vol_reset = async (volId: number, password: string) => {
        await this.knex("volunteers")
            .select()
            .update({
                v_password: password,
            })
            .where("id", volId);
    };
}
