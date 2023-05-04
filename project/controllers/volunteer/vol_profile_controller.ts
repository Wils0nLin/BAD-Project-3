import { vol_profile_service } from "../../services/volunteer/vol_profile_service";
import { Request, Response } from "express";

export class vol_profile_controller {
    constructor(private vol_profile_service: vol_profile_service) {}

    vol_profile = async (req: Request, res: Response) => {
        try {
            const userid: any = req.session.userid;

            const vol_profile = await this.vol_profile_service.profile(userid);

            res.status(200).json(vol_profile);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with the profile" });
        }
    };

    vol_profile_edit = async (req: Request, res: Response) => {
        try {
            const userid: any = req.session.userid;
            const name = req.body.v_name;
            const email = req.body.v_email;
            const birth_date = req.body.v_birth_date;
            const phone_number = req.body.v_phone_number;
            const address = req.body.v_address;

            await this.vol_profile_service.profile_edit(
                userid,
                name,
                email,
                birth_date,
                phone_number,
                address
            );

            res.status(200).json({ message: "success" });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with profile update" });
        }
    };
}
