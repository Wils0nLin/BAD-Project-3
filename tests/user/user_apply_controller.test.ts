import { getRequest, getResponse } from "../utils";
import { user_apply_controller } from "../../controllers/user/user.controller";
import { user_apply_service } from "../../services/user/user.service";
import { Knex } from "knex";
import { Request, Response } from "express";

jest.mock("../../utils/formidable");

describe("userApplyController TestCases", () => {
    let userApplyService: user_apply_service;
    let userApplyController: user_apply_controller;
    let req: Request;
    let res: Response;

    beforeEach(() => {
        userApplyService = new user_apply_service({} as Knex);
        userApplyService.application = jest.fn(() =>
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
        userApplyService.apply_info = jest.fn(() =>
            Promise.resolve([
                {
                    is_shown: false,
                    id: 1,
                    date: "2023-05-11T16:00:00.000Z",
                    time: "14:13",
                    age: "2023-04-11T16:00:00.000Z",
                    gender: "M",
                    c_name: "Cat",
                    c_image: "image-1.jpeg",
                    breed: "Cat",
                    event: "家訪",
                    n: "1",
                },
            ])
        );
        userApplyService.apply_event = jest.fn(() =>
            Promise.resolve([
                {
                    id: 1,
                    event: "家訪",
                    adopt_forms_id: 1,
                    date: "2023-05-11T16:00:00.000Z",
                    time: "14:13",
                    is_select: true,
                    is_shown: false,
                }
            ])
        );

        req = getRequest();
        res = getResponse();

        userApplyController = new user_apply_controller(userApplyService);
    });

    test("Get all the Applications - Success", async () => {
        await userApplyController.user_apply(req, res);

        expect(userApplyService.application).toBeCalledTimes(1);
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

    test("Get the Application Info - Success", async () => {
        await userApplyController.user_apply_info(req, res);

        expect(userApplyService.apply_info).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith([
            {
                is_shown: false,
                id: 1,
                date: "2023-05-11T16:00:00.000Z",
                time: "14:13",
                age: "2023-04-11T16:00:00.000Z",
                gender: "M",
                c_name: "Cat",
                c_image: "image-1.jpeg",
                breed: "Cat",
                event: "家訪",
                n: "1",
            },
        ]);
        expect(res.status).toBeCalledWith(200);
    });

    test("Get the Application Event - Success", async () => {
        await userApplyController.user_apply_event(req, res);

        expect(userApplyService.apply_event).toBeCalledTimes(1);
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
