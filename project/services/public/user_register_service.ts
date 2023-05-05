import type { Knex } from "knex";

export class user_register_service {
    constructor(private knex: Knex) {}

    user_register = async (
        u_username: string,
        hashed: string,
        u_password: string,
        u_name: string,
        u_email: string,
        u_birth_date: Date,
        u_phone_number: string,
        u_address: string,
        home_size_id: number,
        income_id: number,
        existed_pet: boolean,
        pet_before: boolean,
        is_allergy: boolean,
        smoker: boolean,
        knowledge: string,
        future_plan: string
    ) => {
        const outputId = await this.knex("users")
            .insert([
                {
                    u_username,
                    u_password: hashed,
                    u_name,
                    u_email,
                    u_birth_date,
                    u_phone_number,
                    u_address,
                    home_size_id,
                    income_id,
                    existed_pet,
                    pet_before,
                    is_allergy,
                    smoker,
                    knowledge,
                    future_plan,
                },
            ])
            .returning("id");
        return outputId;
    };
}
