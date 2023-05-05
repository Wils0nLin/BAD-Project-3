import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    // Inserts seed entries
    const queryResult = await knex("users").where("id", 1).update({
        u_name: "1",
        u_email: "3@3",
        u_birth_date: 20200202,
        u_phone_number: "4444444",
        u_address: "123",
        u_password: "123123",
        u_username: "fk",
        existed_pet: "0",
        pet_before: "0",
        is_allergy: "0",
        smoker: "0",
        knowledge: "fk",
        future_plan: "fk",
        income_id: 1,
        home_size_id: 2,
    });
    // u_name: "1",
    // u_email: "2@2",
    // u_birth_date: 20200202,
    // u_phone_number: "4444444",
    // u_address: "123",
    // u_password: "123123",
    // u_username: "fk",
    // existed_pet: "0",
    // pet_before: "0",
    // is_allergy: "0",
    // smoker: "0",
    // knowledge: "fk",
    // future_plan: "fk",
    // income_id: 1,
    // home_size_id: 2,
    console.log(queryResult);
}

//     `UPDATE users SET u_name = $1, u_email = $2 , u_birth_date =$3, u_phone_number = $4 , u_address = $5 ,
//     home_size_id = $6,
//     income_id = $7,
//    pet_before = $8,
//    existed_pet = $9,
//    smoker = $10,
//    is_allergy = $11,
//    knowledge = $12,
//    future_plan = $13
//     where id = $14`,
//     [
//         u_name,
//         u_email,
//         u_birth_date,
//         u_phone_number,
//         u_address,
//         home_size_id,
//         income_id,
//         exp,
//         existedPet,
//         smoker,
//         isAllergy,
//         knowledge,
//         future_plan,
//         postId,
// //     ]
// );;
