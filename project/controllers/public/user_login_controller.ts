import { user_login_service } from "../../services/public/user_login_service";
import { Request, Response } from "express";

export class user_login_controller {
    constructor(private user_login_service: user_login_service) {}

    user_login = async (req: Request, res: Response) => {
        try {
            const username = req.body.username;
            const password = req.body.password;

            const user_info = await this.user_login_service.login(username, password);
            console.log(user_info.id);

            req.session.isLoggedIn = true;
            req.session.userid = user_info.id;
            req.session.userType = "user";
            res.status(200).json({ message: "login success!!!" });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "invalid username or password" });
        }
    };
}
