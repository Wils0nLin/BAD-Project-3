import { user_profile_service } from "../../services/user/user_profile_service";
import { Request, Response } from "express";

export class user_profile_controller {
    constructor(private user_profile_service: user_profile_service) {}

    user_profile = async (req: Request, res: Response) => {
        try {
            const userId: any = req.session.userId;

            const user_profile = await this.user_profile_service.profile(userId);
            console.log(user_profile);

            res.status(200).json(user_profile);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with the profile" });
        }
    };

    user_profile_edit = async (req: Request, res: Response) => {
        try {
            const userId: any = req.session.userId;
            const name = req.body.u_name;
            const email = req.body.u_email;
            const birth = req.body.u_birth_date;
            const phone = req.body.u_phone_number;
            const address = req.body.u_address;
            const home_size = req.body.home_size_id;
            const income = req.body.income_id;
            const experience = req.body.exp;
            const existed_pet = req.body.existed_pet;
            const smoker = req.body.smoker;
            const allergy = req.body.isAllergy;
            const knowledge = req.body.knowledge;
            const future_plan = req.body.future_plan;

            await this.user_profile_service.profile_edit(
                userId,
                name,
                email,
                birth,
                phone,
                address,
                home_size,
                income,
                experience,
                existed_pet,
                smoker,
                allergy,
                knowledge,
                future_plan
            );

            res.status(200).json({ message: "success" });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with profile update" });
        }
    };
}
