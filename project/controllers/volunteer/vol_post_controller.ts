import formidable from "formidable";
import { form } from "../../utils/formidable";
import { vol_post_service } from "../../services/volunteer/vol_post_service";
import { Request, Response } from "express";

export class vol_post_controller {
    constructor(private vol_post_service: vol_post_service) {}

    vol_post = async (req: Request, res: Response) => {
        try {
            const volId: any = req.session.userId;

            const vol_post = await this.vol_post_service.post(volId);
            
            res.status(200).json(vol_post);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with the posts" });
        }
    };

    vol_post_delete = async (req: Request, res: Response) => {
        try {
            const postId = +req.params.id;
            if (isNaN(postId)) {
                res.status(400).json({ message: "invalid post id" });
                return;
            }

            await this.vol_post_service.post_delete(postId);

            res.status(200).json({ message: "success" });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with post deletion" });
        }
    };

    vol_post_create = async (req: Request, res: Response) => {
        try {
            form.parse(req, async (err, fields, files) => {
                const volId: any = req.session.userId;
                const name: any = fields.names;
                const gender: any = fields.gender;
                const age: any = fields.age;
                const breed: any = fields.breed;
                const character: any = fields.character;
                const health: any = fields.cat_health;
                const habit: any = fields.habit;
                const intro: any = fields.intro;

                const vol_post: any = await this.vol_post_service.post_create(
                    volId,
                    name,
                    gender,
                    age,
                    breed,
                    character,
                    health,
                    habit,
                    intro
                );
                
                if (files.image) {
                    const imgArr: formidable.File[] = Array.isArray(files.image)
                        ? files.image
                        : [files.image];

                    for (let i = 0; i < imgArr.length; i++) {
                        const img = imgArr[i].newFilename;
                        await this.vol_post_service.post_image(vol_post[0].id, img);
                    }
                }

                if (files.video) {
                    const videoArr: formidable.File[] = Array.isArray(files.video)
                        ? files.video
                        : [files.video];
                    for (let i = 0; i < videoArr.length; i++) {
                        const video = videoArr[i].newFilename;
                        await this.vol_post_service.post_video(vol_post[0].id, video);
                    }
                }
            });

            res.status(200).json({ message: "success" });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with post creation" });
        }
    };

    vol_post_info = async (req: Request, res: Response) => {
        try {
            const postId = +req.params.id;

            const vol_post = await this.vol_post_service.post_info(postId);
            
            res.status(200).json(vol_post);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with the post info" });
        }
    };

    vol_post_edit = async (req: Request, res: Response) => {
        try {
            const postId = +req.params.id;
            const age = req.body.age;
            const gender = req.body.gender;
            const breed = req.body.breed;
            const character = req.body.characters;
            const habit = req.body.food_habits;
            const health = req.body.cat_health;
            const intro = req.body.intro;

            await this.vol_post_service.post_edit(
                postId,
                age,
                gender,
                breed,
                character,
                habit,
                health,
                intro
            );

            res.status(200).json({ message: "success" });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "something wrong with post edition" });
        }
    };
}
