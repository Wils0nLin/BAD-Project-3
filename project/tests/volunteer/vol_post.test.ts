import { getRequest, getResponse } from "../utils";
import { vol_post_controller } from "../../controllers/volunteer/vol_post_controller";
import { vol_post_service } from "../../services/volunteer/vol_post_service";
import { Knex } from "knex";
import { Request, Response } from "express";

jest.mock("../../utils/formidable");

describe("volPostController TestCases", () => {
    let volPostService: vol_post_service;
    let volPostController: vol_post_controller;
    let req: Request;
    let res: Response;

    beforeEach(() => {
        volPostService = new vol_post_service({} as Knex);
        volPostService.post = jest.fn(() =>
            Promise.resolve([
                {
                    volunteer_id: 1,
                    id: 1,
                    c_name: "Cat",
                    intro: "已絕育",
                    gender: "M",
                    c_image_id: 1,
                    c_image: "image-1.jpeg",
                },
            ])
        );
        volPostService.post_info = jest.fn(() =>
            Promise.resolve([
                {
                    video: ["video-1.mp4"],
                    img: ["image-1.jpeg", "image-2.jpeg", "image-3.jpeg", "image-4.jpeg"],
                    cat_name: "Cat",
                    intro: "已絕育",
                    age: "2023-03-05T16:00:00.000Z",
                    gender: "M",
                    breed: "Cat",
                    characters: "文善",
                    cat_health: "已絕育",
                    food_habits: "鮮食",
                },
            ])
        );

        req = getRequest();
        res = getResponse();

        volPostController = new vol_post_controller(volPostService);
    });

    test("Get all the Posts - Success", async () => {
        await volPostController.vol_post(req, res);

        expect(volPostService.post).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith([
            {
                volunteer_id: 1,
                id: 1,
                c_name: "Cat",
                intro: "已絕育",
                gender: "M",
                c_image_id: 1,
                c_image: "image-1.jpeg",
            },
        ]);
        expect(res.status).toBeCalledWith(200);
    });
    
    test("Get the Post Info - Success", async () => {
        await volPostController.vol_post_info(req, res);

        expect(volPostService.post_info).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith([
            {
                video: ["video-1.mp4"],
                img: ["image-1.jpeg", "image-2.jpeg", "image-3.jpeg", "image-4.jpeg"],
                cat_name: "Cat",
                intro: "已絕育",
                age: "2023-03-05T16:00:00.000Z",
                gender: "M",
                breed: "Cat",
                characters: "文善",
                cat_health: "已絕育",
                food_habits: "鮮食",
            },
        ]);
        expect(res.status).toBeCalledWith(200);
    });
});
