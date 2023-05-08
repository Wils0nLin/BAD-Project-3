import type { Knex } from "knex";

export class user_profile_service {
    constructor(private knex: Knex) {}

    profile = async (userId: number) => {
        const user_profile = await this.knex("users")
            .select("users.*", "income.income_value", "home_size.home_size")
            .join("income", "users.income_id", "=", "income.id")
            .join("home_size", "users.home_size_id", "=", "home_size.id")
            .where("users.id", userId);
        return user_profile[0];
    };

    profile_edit = async (
        userId: number,
        name: string,
        email: string,
        birth: Date,
        phone: string,
        address: string,
        home_size: number,
        income: number,
        experience: boolean,
        existed_pet: boolean,
        smoker: boolean,
        allergy: boolean,
        knowledge: string,
        future_plan: string
    ) => {
        await this.knex("users")
            .select()
            .update({
                u_name: name,
                u_email: email,
                u_birth_date: birth,
                u_phone_number: phone,
                u_address: address,
                home_size_id: home_size,
                income_id: income,
                pet_before: experience,
                existed_pet: existed_pet,
                smoker: smoker,
                is_allergy: allergy,
                knowledge: knowledge,
                future_plan: future_plan,
            })
            .where("id", userId);
    };
}
