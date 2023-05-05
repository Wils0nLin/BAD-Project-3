import { Request, Response } from "express";
import { user_profile_data_service } from "../../services/user/user_profile_data_service";

export class user_profile_data_controller {
    constructor(private user_profile_data_service: user_profile_data_service) {}

    user_get_profile = async (req: Request, res: Response) => {
        try {
            const get_profile = await this.user_profile_data_service.user_get_profile(req);
            console.log(get_profile);
            res.json(get_profile);
        } catch (err) {
            res.status(500).json({ message: "internal server error" });
        }
    };

    user_update_profile = async (req: Request, res: Response) => {
        try {
            console.log("hi");

            const postId = +req.params.mid;
            const u_name = req.body.u_name;
            const u_email = req.body.u_email;
            const u_birth_date = req.body.u_birth_date;
            const u_phone_number = req.body.u_phone_number;
            const u_address = req.body.u_address;
            // const u_password = req.body.u_password;
            // const u_username = req.body.u_username;
            const home_size_id = req.body.home_size_id;
            const income_id = req.body.income_id;
            const pet_before = req.body.exp;
            const existed_pet = req.body.existed_pet;
            const smoker = req.body.smoker;
            const is_allergy = req.body.isAllergy;
            const knowledge = req.body.knowledge;
            const future_plan = req.body.future_plan;
            const obj = {
                u_name,
                u_email,
                u_birth_date,
                u_phone_number,
                u_address,
                // u_password,
                // u_username,
                home_size_id,
                income_id,
                pet_before,
                existed_pet,
                smoker,
                is_allergy,
                knowledge,
                future_plan,
                postId,
            };
            console.log(obj);

            if (isNaN(postId)) {
                res.status(400).json({ message: "invalid id" });
                return;
            }

            console.log();

            await this.user_profile_data_service.user_update_profile(
                u_name,
                u_email,
                u_birth_date,
                u_phone_number,
                u_address,
                // u_password,
                // u_username,
                home_size_id,
                income_id,
                pet_before,
                existed_pet,
                smoker,
                is_allergy,
                knowledge,
                future_plan,
                postId
            );

            res.json({ message: "success" });
        } catch (err) {
            res.status(500).json({ message: "internal server error" });
        }
    };
}
