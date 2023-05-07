import { getRequest, getResponse } from "../utils";
import { public_login_controller } from "../../controllers/public/public_login_controller";
import { public_login_service } from "../../services/public/public_login_service";
import { Knex } from "knex";
import { Request, Response } from "express";

jest.mock("../../utils/formidable");

describe("publicLoginController TestCases", () => {
    let publicLoginService: public_login_service;
    let publicLoginController: public_login_controller;
    let req: Request;
    let res: Response;

    beforeEach(() => {
        publicLoginService = new public_login_service({} as Knex);

        req = getRequest();
        res = getResponse();

        publicLoginController = new public_login_controller(publicLoginService);
    });

    test("User Login - Success", async () => {
        publicLoginService.user_login = jest.fn(async (username: string, password: string) => {
            return true;
        });

        await publicLoginController.public_user_login(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(publicLoginService.user_login).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({ message: "login success!!!" });
    });

    test("Volunteer Login - Success", async () => {
        publicLoginService.vol_login = jest.fn(async (username: string, password: string) => {
            return true;
        });

        await publicLoginController.public_vol_login(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(publicLoginService.vol_login).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({ message: "login success!!!" });
    });

    test("User Login - Failure", async () => {
        publicLoginService.user_login = jest.fn(async (username: string, password: string) => {
            throw new Error;
        });

        await publicLoginController.public_user_login(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(publicLoginService.user_login).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({ message: "invalid username or password" });
    });

    test("Volunteer Login - Failure", async () => {
        publicLoginService.vol_login = jest.fn(async (username: string, password: string) => {
            throw new Error;
        });

        await publicLoginController.public_vol_login(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(publicLoginService.vol_login).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({ message: "invalid username or password" });
    });
});
