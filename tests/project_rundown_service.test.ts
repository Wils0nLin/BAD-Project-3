import Knex from "knex";
import { public_cat_service } from "../services/public/public_cat_service";
import { public_forgot_service } from "../services/public/public_forgot_service";
import { public_login_service } from "../services/public/public_login_service";
import { public_register_service } from "../services/public/public_register_service";
import { user_apply_service } from "../services/user/user_apply_service";
import { user_profile_service } from "../services/user/user_profile_service";
import { vol_case_service } from "../services/volunteer/vol_case_service";
import { vol_post_service } from "../services/volunteer/vol_post_service";
import { vol_profile_service } from "../services/volunteer/vol_profile_service";

const knexfile = require("../knexfile");
const knex = Knex(knexfile["test"]);

describe("Service TestCases", () => {
    let publicCatService: public_cat_service;
    let publicForgotService: public_forgot_service;
    let publicLoginService: public_login_service;
    let publicRegisterService: public_register_service;
    let userApplyService: user_apply_service;
    let userProfileService: user_profile_service;
    let volCaseService: vol_case_service;
    let volPostService: vol_post_service;
    let volProfileService: vol_profile_service;

    let userId: number;
    let volId: number;
    let catId: number;
    let imgId: number;
    const u_birth_date: Date = new Date("1998-05-17T16:00:00.000Z");
    const v_birth_date: Date = new Date("1998-05-17T16:00:00.000Z");
    const c_birth_date: Date = new Date("2023-03-05T16:00:00.000Z");
    const event_date: Date = new Date("2023-05-19T16:00:00.000Z");

    beforeEach(async () => {
        publicCatService = new public_cat_service(knex);
        publicForgotService = new public_forgot_service(knex);
        publicLoginService = new public_login_service(knex);
        publicRegisterService = new public_register_service(knex);
        userProfileService = new user_profile_service(knex);
        userApplyService = new user_apply_service(knex);
        volCaseService = new vol_case_service(knex);
        volPostService = new vol_post_service(knex);
        volProfileService = new vol_profile_service(knex);

        userId = await knex("users")
            .insert([
                {
                    u_username: "user",
                    u_password: "$2a$10$dAl2VHcAddW4CU/wwAE1KeTr0ckNgHD7MZDKWCTswEd43xPb8zEyW",
                    u_name: "User",
                    u_email: "user@gmail.com",
                    u_birth_date: u_birth_date,
                    u_phone_number: "88888888",
                    u_address: "address",
                    home_size_id: 1,
                    income_id: 2,
                    pet_before: true,
                    existed_pet: true,
                    smoker: true,
                    is_allergy: true,
                    knowledge: "knowledge",
                    future_plan: "future plan",
                },
            ])
            .returning("id");

        volId = await knex("volunteers")
            .insert([
                {
                    v_username: "volunteer",
                    v_password: "$2a$10$dAl2VHcAddW4CU/wwAE1KeTr0ckNgHD7MZDKWCTswEd43xPb8zEyW",
                    v_name: "Volunteer",
                    v_email: "volunteer@gmail.com",
                    v_birth_date: v_birth_date,
                    v_phone_number: "55555555",
                    v_address: "address",
                },
            ])
            .returning("id");

        catId = await knex("cats")
            .insert([
                {
                    volunteer_id: volId[0].id,
                    c_name: "Cat",
                    age: c_birth_date,
                    gender: "M",
                    breed: "Cat",
                    character: "文善",
                    cat_health: "已絕育",
                    food_habits: "鮮食",
                    intro: "已絕育",
                },
            ])
            .returning("id");

        imgId = await knex("cat_image")
            .insert([
                {
                    cat_id: catId[0].id,
                    c_image: "image-1.jpeg",
                },
                {
                    cat_id: catId[0].id,
                    c_image: "image-2.jpeg",
                },
                {
                    cat_id: catId[0].id,
                    c_image: "image-3.jpeg",
                },
                {
                    cat_id: catId[0].id,
                    c_image: "image-4.jpeg",
                },
            ])
            .returning("id");

        await knex("cat_video").insert([{ cat_id: catId[0].id, c_video: "video-1.mp4" }]);
    });

    test("User Registration - Success", async () => {
        await publicRegisterService.user_register(
            "new user",
            "password",
            "New User",
            "test@gmail.com",
            "1998-05-18T16:00:00.000Z",
            "99999999",
            "address",
            1,
            2,
            true,
            true,
            true,
            true,
            "knowledge",
            "future plan"
        );

        const user_info = await knex("users")
            .select()
            .where("u_username", "new user")
            .andWhere("u_password", "password");

        expect(user_info).toMatchObject([
            {
                u_username: "new user",
                u_password: "password",
                u_name: "New User",
                u_email: "test@gmail.com",
                u_phone_number: "99999999",
                u_address: "address",
                home_size_id: 1,
                income_id: 2,
                pet_before: true,
                existed_pet: true,
                smoker: true,
                is_allergy: true,
                knowledge: "knowledge",
                future_plan: "future plan",
            },
        ]);
    });

    test("Volunteer Registration - Success", async () => {
        await publicRegisterService.vol_register(
            "new volunteer",
            "password",
            "New Volunteer",
            "test@gmail.com",
            "1998-05-18T16:00:00.000Z",
            "66666666",
            "address"
        );

        const vol_info = await knex("volunteers")
            .select()
            .where("v_username", "new volunteer")
            .andWhere("v_password", "password");

        expect(vol_info).toMatchObject([
            {
                v_username: "new volunteer",
                v_password: "password",
                v_name: "New Volunteer",
                v_email: "test@gmail.com",
                v_phone_number: "66666666",
                v_address: "address",
            },
        ]);
    });

    test("User Login - Success", async () => {
        await publicLoginService.user_login("user", "password");

        const user_info = await knex("users")
            .select("id", "u_username", "u_password")
            .where("u_username", "user")
            .first();

        expect(user_info).toMatchObject({
            id: userId[0].id,
            u_username: "user",
            u_password: "$2a$10$dAl2VHcAddW4CU/wwAE1KeTr0ckNgHD7MZDKWCTswEd43xPb8zEyW",
        });
    });

    test("Volunteer Login - Success", async () => {
        await publicLoginService.vol_login("volunteer", "password");

        const vol_info = await knex("volunteers")
            .select("id", "v_username", "v_password")
            .where("v_username", "volunteer")
            .first();

        expect(vol_info).toMatchObject({
            id: volId[0].id,
            v_username: "volunteer",
            v_password: "$2a$10$dAl2VHcAddW4CU/wwAE1KeTr0ckNgHD7MZDKWCTswEd43xPb8zEyW",
        });
    });

    test("User forgot Password - Login Success", async () => {
        await publicForgotService.user_forgot("user", "88888888", "user@gmail.com");

        const user_info = await knex("users")
            .select("id", "u_username", "u_phone_number", "u_email")
            .where("u_username", "user")
            .andWhere("u_phone_number", "88888888")
            .andWhere("u_email", "user@gmail.com")
            .first();

        expect(user_info).toMatchObject({
            id: userId[0].id,
            u_email: "user@gmail.com",
            u_phone_number: "88888888",
            u_username: "user",
        });
    });

    test("Volunteer forgot Password - Login Success", async () => {
        await publicForgotService.vol_forgot("volunteer", "55555555", "volunteer@gmail.com");

        const vol_info = await knex("volunteers")
            .select("id", "v_username", "v_phone_number", "v_email")
            .where("v_username", "volunteer")
            .andWhere("v_phone_number", "55555555")
            .andWhere("v_email", "volunteer@gmail.com")
            .first();

        expect(vol_info).toMatchObject({
            id: volId[0].id,
            v_email: "volunteer@gmail.com",
            v_phone_number: "55555555",
            v_username: "volunteer",
        });
    });

    test("Get all the Cats - Success", async () => {
        await publicCatService.cat();

        const public_cat = await knex("cats")
            .select(
                "volunteer_id",
                "cats.id",
                "c_name",
                "intro",
                "gender",
                "cat_image.id AS c_image_id",
                "cat_image.c_image"
            )
            .leftJoin(
                knex
                    .select(knex.raw("MIN(id) as id, cat_id"))
                    .from("cat_image")
                    .groupBy("cat_id")
                    .as("post"),
                "cats.id",
                "post.cat_id"
            )
            .innerJoin("cat_image", "post.id", "cat_image.id")
            .andWhere("cats.is_shown", 0)
            .orderBy("cats.id");

        expect(public_cat).toMatchObject([
            {
                volunteer_id: volId[0].id,
                id: catId[0].id,
                c_name: "Cat",
                intro: "已絕育",
                gender: "M",
                c_image_id: imgId[0].id,
                c_image: "image-1.jpeg",
            },
        ]);
    });

    test("Get the Cat Info - Success", async () => {
        await publicCatService.cat_info(catId[0].id);

        const public_cat = await knex("cats")
            .select(
                knex.raw(`json_agg(cat_video.c_video) AS video`),
                knex.raw(`json_agg(cat_image.c_image) AS img`),
                "cats.id",
                "cats.c_name AS cat_name",
                "cats.intro AS intro",
                "cats.age AS age",
                "cats.gender AS gender",
                "cats.breed AS breed",
                "cats.character AS characters",
                "cats.cat_health AS cat_health",
                "cats.food_habits AS food_habits",
                "volunteers.v_name",
                "volunteers.v_email",
                "volunteers.v_phone_number"
            )
            .join("cat_image", "cat_image.cat_id", "=", "cats.id")
            .leftJoin("cat_video", "cat_video.cat_id", "=", "cats.id")
            .join("volunteers", "cats.volunteer_id", "=", "volunteers.id")
            .where("cats.id", catId[0].id)
            .groupBy(
                "cats.id",
                "cats.c_name",
                "cats.intro",
                "cats.age",
                "cats.gender",
                "cats.breed",
                "cats.character",
                "cats.cat_health",
                "cats.food_habits",
                "volunteers.v_name",
                "volunteers.v_email",
                "volunteers.v_phone_number"
            )
            .first();

        expect(public_cat).toMatchObject({
            video: ["video-1.mp4", "video-1.mp4", "video-1.mp4", "video-1.mp4"],
            img: ["image-1.jpeg", "image-2.jpeg", "image-3.jpeg", "image-4.jpeg"],
            id: catId[0].id,
            cat_name: "Cat",
            intro: "已絕育",
            gender: "M",
            breed: "Cat",
            characters: "文善",
            cat_health: "已絕育",
            food_habits: "鮮食",
            v_name: "Volunteer",
            v_email: "volunteer@gmail.com",
            v_phone_number: "55555555",
        });
    });

    test("Get the User Profile - Success", async () => {
        const user_profile = await userProfileService.profile(userId[0].id);

        expect(user_profile).toMatchObject({
            u_username: "user",
            u_password: "$2a$10$dAl2VHcAddW4CU/wwAE1KeTr0ckNgHD7MZDKWCTswEd43xPb8zEyW",
            u_name: "User",
            u_email: "user@gmail.com",
            u_phone_number: "88888888",
            u_address: "address",
            home_size_id: 1,
            income_id: 2,
            pet_before: true,
            existed_pet: true,
            smoker: true,
            is_allergy: true,
            knowledge: "knowledge",
            future_plan: "future plan",
        });
    });

    test("Update the User Profile - Success", async () => {
        await userProfileService.profile_edit(
            userId[0].id,
            "User",
            "user@gmail.com",
            u_birth_date,
            "99999999",
            "address",
            1,
            2,
            true,
            true,
            true,
            true,
            "knowledge",
            "future plan"
        );

        const user_info = await knex("users").select().where("id", userId[0].id);

        expect(user_info.length).toBe(1);
        expect(user_info).toMatchObject([
            {
                u_username: "user",
                u_password: "$2a$10$dAl2VHcAddW4CU/wwAE1KeTr0ckNgHD7MZDKWCTswEd43xPb8zEyW",
                u_name: "User",
                u_email: "user@gmail.com",
                u_phone_number: "99999999",
                u_address: "address",
                home_size_id: 1,
                income_id: 2,
                pet_before: true,
                existed_pet: true,
                smoker: true,
                is_allergy: true,
                knowledge: "knowledge",
                future_plan: "future plan",
            },
        ]);
    });

    test("Get the Volunteer Profile - Success", async () => {
        const vol_profile = await volProfileService.profile(volId[0].id);

        expect(vol_profile).toMatchObject({
            v_username: "volunteer",
            v_password: "$2a$10$dAl2VHcAddW4CU/wwAE1KeTr0ckNgHD7MZDKWCTswEd43xPb8zEyW",
            v_name: "Volunteer",
            v_email: "volunteer@gmail.com",
            v_phone_number: "55555555",
            v_address: "address",
        });
    });

    test("Update the Volunteer Profile - Success", async () => {
        await volProfileService.profile_edit(
            volId[0].id,
            "Volunteer",
            "volunteer@gmail.com",
            v_birth_date,
            "66666666",
            "address"
        );

        const vol_info = await knex("volunteers").select().where("id", volId[0].id);

        expect(vol_info.length).toBe(1);
        expect(vol_info).toMatchObject([
            {
                v_username: "volunteer",
                v_password: "$2a$10$dAl2VHcAddW4CU/wwAE1KeTr0ckNgHD7MZDKWCTswEd43xPb8zEyW",
                v_name: "Volunteer",
                v_email: "volunteer@gmail.com",
                v_phone_number: "66666666",
                v_address: "address",
            },
        ]);
    });

    test("Get all Posts of the Volunteer - Success", async () => {
        await volPostService.post(volId[0].id);

        const vol_post = await knex("cats")
            .select(
                "volunteer_id",
                "cats.id",
                "c_name",
                "intro",
                "gender",
                "cat_image.id AS c_image_id",
                "cat_image.c_image"
            )
            .leftJoin(
                knex
                    .select(knex.raw("MIN(id) as id, cat_id"))
                    .from("cat_image")
                    .groupBy("cat_id")
                    .as("post"),
                "cats.id",
                "post.cat_id"
            )
            .innerJoin("cat_image", "post.id", "cat_image.id")
            .where("volunteer_id", volId[0].id)
            .andWhere("cats.is_shown", 0)
            .orderBy("cats.id");

        expect(vol_post).toMatchObject([
            {
                volunteer_id: volId[0].id,
                id: catId[0].id,
                c_name: "Cat",
                intro: "已絕育",
                gender: "M",
                c_image_id: imgId[0].id,
                c_image: "image-1.jpeg",
            },
        ]);
    });

    test("Create new Post - Success", async () => {
        await volPostService.post_create(
            volId[0].id,
            "Kitty",
            "F",
            "2023-03-06T16:00:00.000Z",
            "Cat",
            "文善",
            "已絕育",
            "鮮食",
            "已絕育"
        );

        const vol_post = await knex("cats")
            .select()
            .where("volunteer_id", volId[0].id)
            .andWhere("c_name", "Kitty")
            .andWhere("age", c_birth_date);

        expect(vol_post).toMatchObject([
            {
                volunteer_id: volId[0].id,
                c_name: "Kitty",
                gender: "F",
                breed: "Cat",
                character: "文善",
                cat_health: "已絕育",
                food_habits: "鮮食",
                intro: "已絕育",
            },
        ]);
    });

    test("Create new Post with Image - Success", async () => {
        const vol_post = await volPostService.post_create(
            volId[0].id,
            "Kitty",
            "F",
            "2023-03-06T16:00:00.000Z",
            "Cat",
            "文善",
            "已絕育",
            "鮮食",
            "已絕育"
        );

        await volPostService.post_image(vol_post[0].id, "image-5.jpeg");

        const post_image = await knex("cat_image").select().where("cat_id", vol_post[0].id);

        expect(post_image).toMatchObject([
            {
                cat_id: vol_post[0].id,
                c_image: "image-5.jpeg",
            },
        ]);
    });

    test("Create new Post with Video - Success", async () => {
        const vol_post = await volPostService.post_create(
            volId[0].id,
            "Kitty",
            "F",
            "2023-03-06T16:00:00.000Z",
            "Cat",
            "文善",
            "已絕育",
            "鮮食",
            "已絕育"
        );

        await volPostService.post_video(vol_post[0].id, "video-1.mp4");

        const post_video = await knex("cat_video").select().where("cat_id", vol_post[0].id);

        expect(post_video).toMatchObject([
            {
                cat_id: vol_post[0].id,
                c_video: "video-1.mp4",
            },
        ]);
    });

    test("Delete the Post - Success", async () => {
        const vol_post = await volPostService.post_create(
            volId[0].id,
            "Kitty",
            "F",
            "2023-03-06T16:00:00.000Z",
            "Cat",
            "文善",
            "已絕育",
            "鮮食",
            "已絕育"
        );

        await volPostService.post_delete(vol_post[0].id);

        const post_deleted = await knex("cats").select().where("id", vol_post[0].id);

        expect(post_deleted).toMatchObject([
            {
                volunteer_id: volId[0].id,
                c_name: "Kitty",
                gender: "F",
                breed: "Cat",
                character: "文善",
                cat_health: "已絕育",
                food_habits: "鮮食",
                intro: "已絕育",
                is_shown: "1",
            },
        ]);
    });

    test("Get the Post Info - Success", async () => {
        await volPostService.post_info(catId[0].id);

        const vol_post = await knex("cats")
            .select(
                knex.raw(`json_agg(cat_video.c_video) AS video`),
                knex.raw(`json_agg(cat_image.c_image) AS img`),
                "cats.c_name AS cat_name",
                "cats.intro AS intro",
                "cats.age AS age",
                "cats.gender AS gender",
                "cats.breed AS breed",
                "cats.character AS characters",
                "cats.cat_health AS cat_health",
                "cats.food_habits AS food_habits"
            )
            .join("cat_image", "cat_image.cat_id", "=", "cats.id")
            .leftJoin("cat_video", "cat_video.cat_id", "=", "cats.id")
            .where("cats.id", catId[0].id)
            .groupBy(
                "cats.c_name",
                "cats.intro",
                "cats.age",
                "cats.gender",
                "cats.breed",
                "cats.character",
                "cats.cat_health",
                "cats.food_habits"
            )
            .first();

        expect(vol_post).toMatchObject({
            video: ["video-1.mp4", "video-1.mp4", "video-1.mp4", "video-1.mp4"],
            img: ["image-1.jpeg", "image-2.jpeg", "image-3.jpeg", "image-4.jpeg"],
            cat_name: "Cat",
            intro: "已絕育",
            gender: "M",
            breed: "Cat",
            characters: "文善",
            cat_health: "已絕育",
            food_habits: "鮮食",
        });
    });

    test("Update the Post Information - Success", async () => {
        await volPostService.post_edit(
            catId[0].id,
            "2023-03-06T16:00:00.000Z",
            "M",
            "Kitty",
            "文善",
            "鮮食",
            "已絕育",
            "已絕育"
        );

        const vol_post = await knex("cats").select().where("id", catId[0].id);

        expect(vol_post).toMatchObject([
            {
                volunteer_id: volId[0].id,
                gender: "M",
                breed: "Kitty",
                character: "文善",
                cat_health: "已絕育",
                food_habits: "鮮食",
                intro: "已絕育",
            },
        ]);
    });

    test("Application Submission - Success", async () => {
        await userApplyService.apply_submit(catId[0].id, userId[0].id);

        const user_apply = await knex("adopt_forms")
            .select()
            .where("cat_id", catId[0].id)
            .andWhere("user_id", userId[0].id);

        expect(user_apply).toMatchObject([
            {
                cat_id: catId[0].id,
                user_id: userId[0].id,
                adopt_status: "pending",
            },
        ]);
    });

    test("Application with Image Submission - Success", async () => {
        const user_apply = await userApplyService.apply_submit(catId[0].id, userId[0].id);

        await userApplyService.apply_image(user_apply[0].id, "image-5.jpeg");

        const apply_image = await knex("form_images")
            .select()
            .where("adopt_forms_id", user_apply[0].id);

        expect(apply_image).toMatchObject([
            {
                adopt_forms_id: user_apply[0].id,
                f_image: "image-5.jpeg",
            },
        ]);
    });

    test("Get all Applies of the User - Success", async () => {
        const user_apply = await userApplyService.apply_submit(catId[0].id, userId[0].id);

        await userApplyService.application(userId[0].id);

        const user_application = await knex.raw(`SELECT *
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
            WHERE adopt_forms.user_id = ${userId[0].id}
            ) x
            WHERE n = 1;
        `);

        expect(user_application.rows).toMatchObject([
            {
                img_id: imgId[0].id,
                img: "image-1.jpeg",
                form_id: user_apply[0].id,
                cat_name: "Cat",
                adopt_status: "pending",
                n: "1",
            },
        ]);
    });
    
    test("Get all Cases of the Volunteer - Success", async () => {
        const user_apply = await userApplyService.apply_submit(catId[0].id, userId[0].id);

        await volCaseService.case(volId[0].id);

        const vol_case = await knex.raw(`select *
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
            where cats.volunteer_id = ${volId[0].id}
            ) x
            where n = 1;
        `);

        expect(vol_case.rows).toMatchObject([
            {
                img_id: imgId[0].id,
                img: "image-1.jpeg",
                form_id: user_apply[0].id,
                cat_name: "Cat",
                adopt_status: "pending",
                n: "1",
            },
        ]);
    });

    test("Get the Case Info - Success", async () => {
        const user_apply = await userApplyService.apply_submit(catId[0].id, userId[0].id);
        await userApplyService.apply_image(user_apply[0].id, "image-5.jpeg");

        await volCaseService.case_info(user_apply[0].id);

        const vol_case = await knex("adopt_forms")
            .select("form_images.f_image", "*", "adopt_forms.id as ad_id")
            .join("users", "users.id", "=", "adopt_forms.user_id")
            .join("cats", "cats.id", "=", "adopt_forms.cat_id")
            .join("cat_image", "cats.id", "=", "cat_image.cat_id")
            .join("form_images", "form_images.adopt_forms_id", "=", "adopt_forms.id")
            .where("adopt_forms_id", user_apply[0].id)
            .andWhere("c_image", "image-1.jpeg");

        expect(vol_case).toMatchObject([
            {
                f_image: "image-5.jpeg",
                cat_id: catId[0].id,
                user_id: userId[0].id,
                adopt_status: "pending",
                income_id: 2,
                home_size_id: 1,
                u_name: "User",
                u_phone_number: "88888888",
                u_email: "user@gmail.com",
                u_address: "address",
                u_password: "$2a$10$dAl2VHcAddW4CU/wwAE1KeTr0ckNgHD7MZDKWCTswEd43xPb8zEyW",
                u_username: "user",
                existed_pet: true,
                pet_before: true,
                is_allergy: true,
                smoker: true,
                is_banned: true,
                knowledge: "knowledge",
                future_plan: "future plan",
                volunteer_id: volId[0].id,
                is_finish: true,
                intro: "已絕育",
                c_name: "Cat",
                gender: "M",
                breed: "Cat",
                character: "文善",
                cat_health: "已絕育",
                food_habits: "鮮食",
                is_shown: "0",
                c_image: "image-1.jpeg",
                adopt_forms_id: user_apply[0].id,
                ad_id: user_apply[0].id,
            },
        ]);
    });

    test("Accept the Case Application - Success", async () => {
        const user_apply = await userApplyService.apply_submit(catId[0].id, userId[0].id);

        await volCaseService.case_accept(user_apply[0].id);

        const vol_case = await knex("adopt_forms").select().where("id", user_apply[0].id);

        expect(vol_case).toMatchObject([
            {
                id: user_apply[0].id,
                adopt_status: "ACCEPT",
            },
        ]);
    });

    test("Reject the Case Application - Success", async () => {
        const user_apply = await userApplyService.apply_submit(catId[0].id, userId[0].id);

        await volCaseService.case_reject(user_apply[0].id);

        const vol_case = await knex("adopt_forms").select().where("id", user_apply[0].id);

        expect(vol_case).toMatchObject([
            {
                id: user_apply[0].id,
                adopt_status: "REJECT",
            },
        ]);
    });

    test("Create Event for the Case - Success", async () => {
        const user_apply = await userApplyService.apply_submit(catId[0].id, userId[0].id);

        await volCaseService.case_edit(user_apply[0].id, event_date, "14:13", "家訪");

        const vol_case = await knex("events").select().where("adopt_forms_id", user_apply[0].id);

        expect(vol_case).toMatchObject([
            {
                event: "家訪",
                adopt_forms_id: user_apply[0].id,
                date: event_date,
                time: "14:13",
            },
        ]);
    });

    test("Update Event for the Case - Success", async () => {
        const user_apply = await userApplyService.apply_submit(catId[0].id, userId[0].id);
        const case_event = await knex("events")
            .select()
            .insert({
                adopt_forms_id: user_apply[0].id,
                date: event_date,
                time: "14:13",
                event: "家訪",
            })
            .returning("id");

        await userApplyService.apply_edit(user_apply[0].id, case_event[0].id);

        const apply_event = await knex("events").select().where("adopt_forms_id", user_apply[0].id);

        expect(apply_event).toMatchObject([
            {
                event: "家訪",
                adopt_forms_id: user_apply[0].id,
                date: event_date,
                time: "14:13",
                is_select: true,
                is_shown: false,
            },
        ]);
    });

    test("Get all Events of the Application - Success", async () => {
        const user_apply = await userApplyService.apply_submit(catId[0].id, userId[0].id);
        const case_event = await knex("events")
            .select()
            .insert({
                adopt_forms_id: user_apply[0].id,
                date: event_date,
                time: "14:13",
                event: "家訪",
            })
            .returning("id");
        await userApplyService.apply_edit(user_apply[0].id, case_event[0].id);

        await userApplyService.apply_event(user_apply[0].id);

        const apply_event = await knex("events").select().where("adopt_forms_id", user_apply[0].id);

        expect(apply_event).toMatchObject([
            {
                event: "家訪",
                adopt_forms_id: user_apply[0].id,
                date: event_date,
                time: "14:13",
                is_select: true,
                is_shown: false,
            },
        ]);
    });

    test("Get all Events of the case - Success", async () => {
        const user_apply = await userApplyService.apply_submit(catId[0].id, userId[0].id);
        const case_event = await knex("events")
            .select()
            .insert({
                adopt_forms_id: user_apply[0].id,
                date: event_date,
                time: "14:13",
                event: "家訪",
            })
            .returning("id");
        await userApplyService.apply_edit(user_apply[0].id, case_event[0].id);

        await volCaseService.case_event(user_apply[0].id);

        const event_selected = await knex("events").select().where("adopt_forms_id", user_apply[0].id);

        expect(event_selected).toMatchObject([
            {
                event: "家訪",
                adopt_forms_id: user_apply[0].id,
                date: event_date,
                time: "14:13",
                is_select: true,
                is_shown: false,
            },
        ]);
    });

    afterEach(async () => {
        await knex("events").del();
        await knex("form_images").del();
        await knex("adopt_forms").del();
        await knex("cat_video").del();
        await knex("cat_image").del();
        await knex("cats").del();
        await knex("volunteers").del();
        await knex("users").del();
    });

    afterAll(async () => {
        await knex.destroy();
    });
});
