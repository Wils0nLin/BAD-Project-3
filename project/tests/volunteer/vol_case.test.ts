import { getRequest, getResponse } from "../utils";
import { vol_case_controller } from "../../controllers/volunteer/vol_case_controller";
import { vol_case_service } from "../../services/volunteer/vol_case_service";
import { Knex } from "knex";
import { Request, Response } from "express";

jest.mock("../../utils/formidable");

describe("volCaseController TestCases", () => {
    let volCaseService: vol_case_service;
    let volCaseController: vol_case_controller;
    let req: Request;
    let res: Response;

    beforeEach(() => {
        volCaseService = new vol_case_service({} as Knex);
        volCaseService.case = jest.fn(() =>
            Promise.resolve([
                {
                    img_id: 1,
                    img: "image-1.jpeg",
                    form_id: 1,
                    cat_name: "Cat",
                    adopt_status: "ACCEPT",
                    n: "1",
                },
            ])
        );
        volCaseService.case_info = jest.fn(() =>
            Promise.resolve([
                {
                    f_image: "image-5.jpeg",
                    id: 1,
                    cat_id: 1,
                    user_id: 1,
                    adopt_status: "ACCEPT",
                    income_id: 1,
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
                    u_birth_date: "2023-03-27T16:00:00.000Z",
                    knowledge: "knowledge",
                    future_plan: "future plan",
                    volunteer_id: 1,
                    is_finish: true,
                    intro: "已絕育",
                    age: "2023-03-05T16:00:00.000Z",
                    c_name: "Cat",
                    gender: "M",
                    breed: "Cat",
                    characters: "文善",
                    cat_health: "已絕育",
                    food_habits: "鮮食",
                    is_shown: "0",
                    c_image: "image-1.jpeg",
                    adopt_forms_id: 1,
                    ad_id: 1,
                },
            ])
        );
        volCaseService.case_event = jest.fn(() =>
            Promise.resolve([
                {
                    id: 1,
                    event: "家訪",
                    adopt_forms_id: 1,
                    date: "2023-05-11T16:00:00.000Z",
                    time: "14:13",
                    is_select: true,
                    is_shown: false,
                },
            ])
        );

        req = getRequest();
        res = getResponse();

        volCaseController = new vol_case_controller(volCaseService);
    });

    test("Get all the Cases - Success", async () => {
        await volCaseController.vol_case(req, res);

        expect(volCaseService.case).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith([
            {
                img_id: 1,
                img: "image-1.jpeg",
                form_id: 1,
                cat_name: "Cat",
                adopt_status: "ACCEPT",
                n: "1",
            },
        ]);
        expect(res.status).toBeCalledWith(200);
    });

    test("Get the Case Info - Success", async () => {
        await volCaseController.vol_case_info(req, res);

        expect(volCaseService.case_info).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith([
            {
                f_image: "image-5.jpeg",
                id: 1,
                cat_id: 1,
                user_id: 1,
                adopt_status: "ACCEPT",
                income_id: 1,
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
                u_birth_date: "2023-03-27T16:00:00.000Z",
                knowledge: "knowledge",
                future_plan: "future plan",
                volunteer_id: 1,
                is_finish: true,
                intro: "已絕育",
                age: "2023-03-05T16:00:00.000Z",
                c_name: "Cat",
                gender: "M",
                breed: "Cat",
                characters: "文善",
                cat_health: "已絕育",
                food_habits: "鮮食",
                is_shown: "0",
                c_image: "image-1.jpeg",
                adopt_forms_id: 1,
                ad_id: 1,
            },
        ]);
        expect(res.status).toBeCalledWith(200);
    });

    test("Get the Case Event - Success", async () => {
        await volCaseController.vol_case_event(req, res);

        expect(volCaseService.case_event).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith([
            {
                id: 1,
                event: "家訪",
                adopt_forms_id: 1,
                date: "2023-05-11T16:00:00.000Z",
                time: "14:13",
                is_select: true,
                is_shown: false,
            },
        ]);
        expect(res.status).toBeCalledWith(200);
    });
});
