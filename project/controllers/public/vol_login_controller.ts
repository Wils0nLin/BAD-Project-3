import { vol_login_service } from "../../services/public/vol_login_service";
import { Request, Response } from "express";

export class vol_login_controller {
    constructor(private vol_login_service: vol_login_service) {}

    vol_login = async (req: Request, res: Response) => {
        try {
            const username = req.body.username;
            const password = req.body.password;
      
            const vol_info = await this.vol_login_service.login(username, password);
     
            req.session.isLoggedIn = true;
            req.session.userid = vol_info.id;
            req.session.userType = "volunteer";
            res.status(200).json({ message: "login success!!!" });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "invalid username or password" });
        }
    };
}
