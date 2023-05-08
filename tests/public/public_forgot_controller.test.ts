import { getRequest, getResponse } from "../utils";
import { public_forgot_controller } from "../../controllers/public/public_forgot_controller";
import { public_forgot_service } from "../../services/public/public_forgot_service";
import { Knex } from "knex";
import { Request, Response } from "express";

jest.mock("../../utils/formidable");

describe("publicForgotController TestCases", () => {
    let publicForgotService: public_forgot_service;
    let publicForgotController: public_forgot_controller;
    let req: Request;
    let res: Response;

    beforeEach(() => {
        publicForgotService = new public_forgot_service({} as Knex);

        req = getRequest();
        res = getResponse();

        publicForgotController = new public_forgot_controller(publicForgotService);
    });

    test("User Forgot Password - Success", async () => {
        publicForgotService.user_forgot = jest.fn(
            async (username: string, phone: string, email: string) => {
                return true;
            }
        );

        await publicForgotController.public_user_forgot(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(publicForgotService.user_forgot).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({ message: "login success!!!" });
    });

    test("Volunteer Forgot Password - Success", async () => {
        publicForgotService.vol_forgot = jest.fn(
            async (username: string, phone: string, email: string) => {
                return true;
            }
        );

        await publicForgotController.public_vol_forgot(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(publicForgotService.vol_forgot).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({ message: "login success!!!" });
    });

    test("User Forgot Password - Failure", async () => {
        publicForgotService.user_forgot = jest.fn(
            async (username: string, phone: string, email: string) => {
                throw new Error;
            }
        );

        await publicForgotController.public_user_forgot(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(publicForgotService.user_forgot).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({ message: "invalid information" });
    });

    test("Volunteer Forgot Password - Failure", async () => {
        publicForgotService.vol_forgot = jest.fn(
            async (username: string, phone: string, email: string) => {
                throw new Error;
            }
        );

        await publicForgotController.public_vol_forgot(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(publicForgotService.vol_forgot).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({ message: "invalid information" });
    });
});
