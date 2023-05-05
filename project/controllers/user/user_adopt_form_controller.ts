import { Request, Response } from "express";
import { user_adopt_form_service } from "../../services/user/user_adopt_form_service";

export class user_adopt_form_controller {
    constructor(private user_adopt_form_service: user_adopt_form_service) {}

    user_apply_status = async (req: Request, res: Response) => {
        try {
            const apply_status = await this.user_adopt_form_service.user_apply_status(req);
            res.json(apply_status.rows);
        } catch (err) {
            res.status(500).json({ message: "internal server error" });
        }
    };

    user_pending_case = async (req: Request, res: Response) => {
        try {
            const caseID = +req.params.caseID;
            console.log(caseID);

            const pending_case = await this.user_adopt_form_service.user_pending_case(caseID);
            res.json(pending_case);
            console.log(pending_case);

        } catch (err) {
            res.status(500).json({ message: "internal server error" });
        }
    };

    user_get_event_case = async (req: Request, res: Response) => {
        try {
            const get_event = await this.user_adopt_form_service.user_get_event(req);
            res.json(get_event);
        } catch (err) {
            res.status(500).json({ message: "internal server error" });
        }
    };

    user_form_pre_place = async (req: Request, res: Response) => {
        try {
            const adopt_form = await this.user_adopt_form_service.user_adopt_form(req);
            res.json(adopt_form);
        } catch (err) {
            res.status(500).json({ message: "internal server error" });
        }
    };
}
