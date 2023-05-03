import { Request, Response } from "express";
import { user_adopt_form_service } from "../../services/user/user_adopt_form_service";

export class user_adopt_form_controller {
    constructor(private user_adopt_form_service: user_adopt_form_service) {}

    user_apply_status = async (req: Request, res: Response) => {
        try {
            const apply_status = await this.user_adopt_form_service.user_apply_status();
            res.json(apply_status);
        } catch (err) {
            res.status(500).json({ message: "internal server error" });
        }
    };

    user_pending_case;

    user_get_event;

    user_adopt_form;
}
