import { getRequest, getResponse } from "../utils";
import { vol_profile_controller } from "../../controllers/volunteer/vol_profile_controller";
import { vol_profile_service } from "../../services/volunteer/vol_profile_service";
import { Knex } from "knex";
import { Request, Response } from "express";

jest.mock("../../utils/formidable");

describe("volProfileController TestCases", () => {
    let volProfileService: vol_profile_service;
    let volProfileController: vol_profile_controller;
    let req: Request;
    let res: Response;

    beforeEach(() => {
        volProfileService = new vol_profile_service({} as Knex);
        volProfileService.profile = jest.fn(() =>
            Promise.resolve([
                {
                    id: 1,
                    v_name: "Volunteer",
                    v_phone_number: "55555555",
                    v_email: "volunteer@gmail.com",
                    v_address: "address",
                    v_password: "password",
                    v_username: "volunteer",
                    v_birth_date: "1998-05-14T16:00:00.000Z",
                },
            ])
        );

        req = getRequest();
        res = getResponse();

        volProfileController = new vol_profile_controller(volProfileService);
    });

    test("Get the Volunteer Profile - Success", async () => {
        await volProfileController.vol_profile(req, res);

        expect(volProfileService.profile).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith([
            {
                id: 1,
                v_name: "Volunteer",
                v_phone_number: "55555555",
                v_email: "volunteer@gmail.com",
                v_address: "address",
                v_password: "password",
                v_username: "volunteer",
                v_birth_date: "1998-05-14T16:00:00.000Z",
            },
        ]);
        expect(res.status).toBeCalledWith(200);
    });
});
