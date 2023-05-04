import type { Request, Response } from "express";
import { user_cat_adopt_service } from "../../services/user/user_cat_adopt_service";

export class user_cat_adopt_controller {
    constructor(private user_cat_adopt_service: user_cat_adopt_service) {}

    get_all_cat = async (req: Request, res: Response) => {
        try {
            const all_cat = await this.user_cat_adopt_service.get_all_cat();
            res.json(all_cat);
        } catch (err) {
            res.status(500).json({ message: "server error" });
        }
    };

    get_cat_detail = async (req: Request, res: Response) => {
        try {
            const postID = parseInt(req.params.id, 10);
            if (isNaN(postID)) {
                res.status(400).json({ message: "invalid cat id" });
            }

            const cat_detail = await this.user_cat_adopt_service.get_cat_detail(postID);
            res.json(cat_detail);
        } catch (err) {
            res.status(500).json({ message: "server error" });
        }
    };
}
