import { Request, Response } from "express";
import { user_event_insert_service } from "../../services/user/user_event_insert_service";

export class user_event_insert_controller {
    constructor(private user_event_insert_service: user_event_insert_service) {}

    user_event_insert = async (req: Request, res: Response) => {
        try {
            const event_insert = await this.user_event_insert_service.user_event_insert(req, res);
            res.json(event_insert);
        } catch (err) {
            res.status(500).json({ message: "internal server error" });
        }
    };
}
