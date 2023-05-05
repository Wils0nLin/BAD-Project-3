import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    // Inserts seed entries
    const queryResult = await knex.raw(
        `select *
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
          where adopt_forms.user_id = 1
    ) x
    where n = 1
    ;`
    );

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
