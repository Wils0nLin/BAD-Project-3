import { hashPassword } from "../../utils/hash";
import { public_forgot_service } from "../../services/public/public_forgot_service";
import { Request, Response } from "express";

export class public_forgot_controller {
    constructor(private public_forgot_service: public_forgot_service) {}

    public_user_forgot = async (req: Request, res: Response) => {
        try {
            const username = req.body.username;
            const phone = req.body.phone;
            const email = req.body.email;
      
            const user_info = await this.public_forgot_service.user_forgot(username, phone, email);
     
            req.session.userId = user_info.id;
            req.session.userType = "user";
            res.status(200).json({ message: "login success!!!" });
        } catch (err) {
            res.status(400).json({ message: "invalid information" });
        }
    };

    public_vol_forgot = async (req: Request, res: Response) => {
        try {
            const username = req.body.username;
            const phone = req.body.phone;
            const email = req.body.email;
      
            const vol_info = await this.public_forgot_service.vol_forgot(username, phone, email);
     
            req.session.userId = vol_info.id;
            req.session.userType = "volunteer";
            res.status(200).json({ message: "login success!!!" });
        } catch (err) {
            res.status(400).json({ message: "invalid information" });
        }
    };

    public_user_reset = async (req: Request, res: Response) => {
        try {
            const userId: any = req.session.userId;
            const password = req.body.password;

            let passwordH = await hashPassword(password);

            await this.public_forgot_service.user_reset(
                userId,
                passwordH
            );

            res.status(200).json({ message: "success" });
        } catch (err) {
            res.status(400).json({ message: "something wrong with password update" });
        }
    };

    public_vol_reset = async (req: Request, res: Response) => {
        try {
            const volId: any = req.session.userId;
            const password = req.body.password;

            let passwordH = await hashPassword(password);

            await this.public_forgot_service.vol_reset(
                volId,
                passwordH
            );

            res.status(200).json({ message: "success" });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with password update" });
        }
    };
}