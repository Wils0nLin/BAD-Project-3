import { getRequest, getResponse } from "../utils";
import { public_cat_controller } from "../../controllers/public/public_cat_controller";
import { public_cat_service } from "../../services/public/public_cat_service";
import { Knex } from "knex";
import { Request, Response } from "express";

jest.mock("../../utils/formidable");

describe("publicCatController TestCases", () => {
    let publicCatService: public_cat_service;
    let publicCatController: public_cat_controller;
    let req: Request;
    let res: Response;

    beforeEach(() => {
        publicCatService = new public_cat_service({} as Knex);
        publicCatService.cat = jest.fn(() =>
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
        publicCatService.cat_info = jest.fn(() =>
            Promise.resolve([
                {
                    video: ["video-1.mp4"],
                    img: ["image-1.jpeg", "image-2.jpeg", "image-3.jpeg", "image-4.jpeg"],
                    id: 1,
                    cat_name: "Cat",
                    intro: "已絕育",
                    age: "2023-03-05T16:00:00.000Z",
                    gender: "M",
                    breed: "Cat",
                    characters: "文善",
                    cat_health: "已絕育",
                    food_habits: "鮮食",
                    v_name: "Volunteer",
                    v_email: "volunteer@gmail.com",
                    v_phone_number: "55555555",
                },
            ])
        );

        req = getRequest();
        res = getResponse();

        publicCatController = new public_cat_controller(publicCatService);
    });

    test("Get all the Cats - Success", async () => {
        await publicCatController.public_cat(req, res);

        expect(publicCatService.cat).toBeCalledTimes(1);
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

    test("Get the Cat Info - Success", async () => {
        await publicCatController.public_cat_info(req, res);
      
        expect(publicCatService.cat_info).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith([
            {
                video: ["video-1.mp4"],
                img: ["image-1.jpeg", "image-2.jpeg", "image-3.jpeg", "image-4.jpeg"],
                id: 1,
                cat_name: "Cat",
                intro: "已絕育",
                age: "2023-03-05T16:00:00.000Z",
                gender: "M",
                breed: "Cat",
                characters: "文善",
                cat_health: "已絕育",
                food_habits: "鮮食",
                v_name: "Volunteer",
                v_email: "volunteer@gmail.com",
                v_phone_number: "55555555",
            },
        ]);
        expect(res.status).toBeCalledWith(200);
    });
});