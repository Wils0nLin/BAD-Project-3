import { public_login_service } from "../../services/public/public_login_service";
import { Request, Response } from "express";

export class public_login_controller {
    constructor(private public_login_service: public_login_service) {}

    public_user_login = async (req: Request, res: Response) => {
        try {
            const username = req.body.username;
            const password = req.body.password;

            const user_info = await this.public_login_service.user_login(username, password);
            
            req.session.isLoggedIn = true;
            req.session.userId = user_info.id;
            req.session.userType = "user";
            res.status(200).json({ message: "login success!!!" });
        } catch (err) {
            res.status(400).json({ message: "invalid username or password" });
        }
    };

    public_vol_login = async (req: Request, res: Response) => {
        try {
            const username = req.body.username;
            const password = req.body.password;
      
            const vol_info = await this.public_login_service.vol_login(username, password);
     
            req.session.isLoggedIn = true;
            req.session.userId = vol_info.id;
            req.session.userType = "volunteer";
            res.status(200).json({ message: "login success!!!" });
        } catch (err) {
            res.status(400).json({ message: "invalid username or password" });
        }
    };
}
