import { getRequest, getResponse } from "../utils";
import { user_profile_controller } from "../../controllers/user/user_profile_controller";
import { user_profile_service } from "../../services/user/user_profile_service";
import { Knex } from "knex";
import { Request, Response } from "express";

jest.mock("../../utils/formidable");

describe("userProfileController TestCases", () => {
    let userProfileService: user_profile_service;
    let userProfileController: user_profile_controller;
    let req: Request;
    let res: Response;

    beforeEach(() => {
        userProfileService = new user_profile_service({} as Knex);
        userProfileService.profile = jest.fn(() =>
            Promise.resolve([
                {
                    id: 1,
                    income_id: 2,
                    home_size_id: 1,
                    u_name: "User",
                    u_phone_number: "88888888",
                    u_email: "user@gmail.com",
                    u_address: "address",
                    u_password: "password",
                    u_username: "user",
                    existed_pet: true,
                    pet_before: true,
                    is_allergy: true,
                    smoker: true,
                    is_banned: true,
                    u_birth_date: "1998-05-14T16:00:00.000Z",
                    knowledge: "knowledge",
                    future_plan: "future plan",
                    income_value: "20000以下",
                    home_size: "400呎以下",
                },
            ])
        );

        req = getRequest();
        res = getResponse();

        userProfileController = new user_profile_controller(userProfileService);
    });

    test("Get the User Profile - Success", async () => {
        await userProfileController.user_profile(req, res);

        expect(userProfileService.profile).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith([
            {
                id: 1,
                income_id: 2,
                home_size_id: 1,
                u_name: "User",
                u_phone_number: "88888888",
                u_email: "user@gmail.com",
                u_address: "address",
                u_password: "password",
                u_username: "user",
                existed_pet: true,
                pet_before: true,
                is_allergy: true,
                smoker: true,
                is_banned: true,
                u_birth_date: "1998-05-14T16:00:00.000Z",
                knowledge: "knowledge",
                future_plan: "future plan",
                income_value: "20000以下",
                home_size: "400呎以下",
            },
        ]);
        expect(res.status).toBeCalledWith(200);
    });
});
