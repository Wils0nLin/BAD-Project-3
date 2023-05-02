import { UserLoginService } from "../services/UserLoginService";
import { Request, Response } from "express";

export class UserLoginController {
  constructor(private userLoginService: UserLoginService) {}

  userLoginControl = async (req: Request, res: Response) => {
    try {
      const username = req.body.username;
      const password = req.body.password;

      await this.userLoginService.login(username, password);

      req.session.isLoggedIn = true;
      res.json({ message: "login success!!!" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "invalid username or password" });
    }
  };
}
