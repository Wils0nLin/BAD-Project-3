import formidable from "formidable";
import { form } from "../../utils/formidable";
import { user_apply_service } from "../../services/user/user_apply_service";
import { Request, Response } from "express";

export class user_apply_controller {
    constructor(private user_apply_service: user_apply_service) {}

    user_apply_submit = async (req: Request, res: Response) => {
        try {
            form.parse(req, async (err, fields, files) => {
                const userId: any = req.session.userId;
                const catId: any = fields.cat_id;

                const form_id = await this.user_apply_service.apply_submit(catId, userId);

                const imgArr: formidable.File[] = Array.isArray(files.image)
                    ? files.image
                    : [files.image];

                for (let i = 0; i < imgArr.length; i++) {
                    const img = imgArr[i].newFilename;
                    await this.user_apply_service.apply_image(form_id[0].id, img);
                }
            });
            res.json({ message: "success" });
        } catch (err) {
            res.status(500).json({ message: "internal server error" });
        }
    };

    user_apply = async (req: Request, res: Response) => {
        try {
            const userId: any = req.session.userId;

            const vol_apply = await this.user_apply_service.application(userId);
            console.log(vol_apply);

            res.status(200).json(vol_apply);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with the applications" });
        }
    };

    user_apply_info = async (req: Request, res: Response) => {
        try {
            const applyId = +req.params.id;

            const vol_apply = await this.user_apply_service.apply_info(applyId);
            console.log(vol_apply);
            
            res.status(200).json(vol_apply);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with the applications" });
        }
    };

    user_apply_event = async (req: Request, res: Response) => {
        try {
            const applyId = +req.params.id;

            const vol_apply = await this.user_apply_service.apply_event(applyId);
            console.log(vol_apply);
            
            res.status(200).json(vol_apply);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with the applications" });
        }
    };

    user_apply_edit = async (req: Request, res: Response) => {
        try {
            const caseId: any = +req.params.id;
            const dateId: any = req.body.date_id;

            await this.user_apply_service.apply_edit(caseId, dateId);

            res.status(200).json({ message: "success" });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with the applications" });
        }
    };
}
