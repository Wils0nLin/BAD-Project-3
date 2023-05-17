import formidable from "formidable";
import { form } from "../../utils/formidable";
import { UserApplyService } from "../../services/user/user.service";
import { Request, Response, Router } from "express";

export class user_apply_controller {
    public router: Router;

    constructor(private user_apply_service: UserApplyService) {
        this.router = Router();
        this.router.post("/application", this.create);
        this.router.get("/application", this.getAllForm);
        this.router.get("/application/:id", this.getFormById);
        this.router.get("/events/:id", this.getEventById);
        this.router.put("/event/:id", this.update);
    }

    create = async (req: Request, res: Response) => {
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

    getAllForm = async (req: Request, res: Response) => {
        try {
            const userId: any = req.session.userId;

            const vol_apply = await this.user_apply_service.application(userId);

            res.status(200).json(vol_apply);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with the applications" });
        }
    };

    getFormById = async (req: Request, res: Response) => {
        try {
            const applyId = +req.params.id;

            const vol_apply = await this.user_apply_service.apply_info(applyId);

            res.status(200).json(vol_apply);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with the applications" });
        }
    };

    getEventById = async (req: Request, res: Response) => {
        try {
            const applyId = +req.params.id;

            const vol_apply = await this.user_apply_service.apply_event(applyId);

            res.status(200).json(vol_apply);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with the applications" });
        }
    };

    update = async (req: Request, res: Response) => {
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
