import { public_cat_service } from "../../services/public/public_cat_service";
import { Request, Response } from "express";

export class public_cat_controller {
    constructor(private public_cat_service: public_cat_service) {}

    public_cat = async (_req: Request, res: Response) => {
        try {
            const public_cat = await this.public_cat_service.cat();
            console.log(public_cat);

            res.status(200).json(public_cat);
        } catch (err) {
            res.status(500).json({ message: "something wrong with the cats" });
        }
    };

    public_cat_info = async (req: Request, res: Response) => {
        try {
            const catId = +req.params.id;
            const public_cat = await this.public_cat_service.cat_info(catId);
            console.log(public_cat);

            res.status(200).json(public_cat);
        } catch (err) {
            res.status(500).json({ message: "something wrong with the cats" });
        }
    };
}