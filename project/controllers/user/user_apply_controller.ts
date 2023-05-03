import { Request, Response } from "express";
import { user_apply_service } from "../../services/user/user_apply_service";
import { form, formParsePromise } from "../../routers/formidable";
import formidable from "formidable";

export class user_apply_controller {
    constructor(private user_apply_service: user_apply_service) {}

    user_apply = async (req: Request, res: Response) => {
        try {
            form.parse(req, async (err, fields, files) => {
                const user_id = fields.user_id;
                const cat_id = fields.cat_id;

                const form_id = await this.user_apply_service.user_apply(cat_id, user_id);

                const imgArr: formidable.File[] = Array.isArray(files.image)
                    ? files.image
                    : [files.image];

                for (let i = 0; i < imgArr.length; i++) {
                    const img = imgArr[i].newFilename;
                    await this.user_apply_service.user_apply_for(form_id.rows[0].id, img);
                }
            });
            res.json({ success: true });
        } catch (err) {
            res.status(500).json({ message: "internal server error" });
        }
    };
}
