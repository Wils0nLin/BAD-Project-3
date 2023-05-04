import { Request, Response } from "express";
import { user_get_data_edit_case_service } from "../../services/user/user_get_data_edit_case_service";

export class user_get_data_edit_case_controller {
    constructor(private user_get_data_edit_case_service: user_get_data_edit_case_service) {}

    update_cat_profile = async (req: Request, res: Response) => {
        try {
            const caseId = +req.params.caseId;
            const age = req.body.age;
            const gender = req.body.gender;
            const breed = req.body.breed;
            const characters = req.body.characters;
            const food_habits = req.body.food_habits;
            const cat_health = req.body.cat_health;
            const intro = req.body.intro;

            if (isNaN(caseId)) {
                res.status(400).json({ message: "invalid id" });
                return;
            }

            await this.user_get_data_edit_case_service.update_cat_profile(
                caseId,
                age,
                gender,
                breed,
                characters,
                food_habits,
                cat_health,
                intro
            );
        } catch (err) {
            res.status(500).json({ message: "internal server error" });
        }
    };

    get_data_edit_case = async (req: Request, res: Response) => {
        try {
            const data_edit_case = await this.user_get_data_edit_case_service.get_data_edit_case(
                req
            );
            res.json(data_edit_case);
        } catch (err) {
            res.status(500).json({ message: "internal server error" });
        }
    };
}
