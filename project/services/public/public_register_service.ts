import type { Knex } from "knex";

export class public_register_service {
    constructor(private knex: Knex) {}

    user_register = async (
        username: string,
        password: string,
        name: string,
        email: string,
        birth_date: string,
        phone_number: string,
        address: string,
        home_size: number,
        income: number,
        existed_pet: boolean,
        experience: boolean,
        allergy: boolean,
        smoker: boolean,
        knowledge: string,
        future_plan: string
    ) => {
        await this.knex("users").insert({
            u_username: username,
            u_password: password,
            u_name: name,
            u_email: email,
            u_birth_date: birth_date,
            u_phone_number: phone_number,
            u_address: address,
            home_size_id: home_size,
            income_id: income,
            pet_before: experience,
            existed_pet: existed_pet,
            smoker: smoker,
            is_allergy: allergy,
            knowledge: knowledge,
            future_plan: future_plan,
        });
    };

    vol_register = async (
        username: string,
        password: string,
        name: string,
        email: string,
        birth_date: string,
        phone_number: string,
        address: string
    ) => {
        await this.knex("volunteers").insert({
            v_username: username,
            v_password: password,
            v_name: name,
            v_email: email,
            v_birth_date: birth_date,
            v_phone_number: phone_number,
            v_address: address,
        });
    };
}
