import { Request, Response } from "express";
import { user_profile_data_service } from "../../services/user/user_profile_data_service";

export class user_profile_data_controller {
    constructor(private user_profile_data_service: user_profile_data_service) {}

    user_get_profile = async (req: Request, res: Response) => {
        try {
            const get_profile = await this.user_profile_data_service.user_get_profile(req);
            res.json(get_profile);
        } catch (err) {
            res.status(500).json({ message: "internal server error" });
        }
    };

    user_update_profile = async (req: Request, res: Response) => {
        try {
            const postId = +req.params.mid;
            const v_name = req.body.v_name;
            const v_email = req.body.v_email;
            const v_birth_date = req.body.v_birth_date;
            const v_phone_number = req.body.v_phone_number;
            const v_address = req.body.v_address;

            if (isNaN(postId)) {
                res.status(400).json({ message: "invalid id" });
                return;
            }

            await this.user_profile_data_service.user_update_profile(
                postId,
                v_name,
                v_email,
                v_birth_date,
                v_phone_number,
                v_address
            );
        } catch (err) {
            res.status(500).json({ message: "internal server error" });
        }
    };
}
