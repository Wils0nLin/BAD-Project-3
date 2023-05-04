import express from "express";
import formidable from "formidable";
import { form } from "./formidable";
import { dbClient } from "../server";

export const catPostRoute = express.Router();

catPostRoute.post("/post", (req, res) => {
    console.log("HI");
    form.parse(req, async (err, fields, files) => {
        console.log(fields);
        const names = fields.names;
        const gender = fields.gender;
        const age = fields.age;
        const breed = fields.breed;
        const character = fields.character;
        const cat_health = fields.cat_health;
        const habit = fields.habit;
        const intro = fields.intro;
        //volunteer is dummy
        const volunteer_id = req.session.userid;

        const idResult = await dbClient.query(
            "INSERT INTO cats (volunteer_id,c_name,age,gender,breed,character,cat_health,food_habits,intro)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id",
            [volunteer_id, names, age, gender, breed, character, cat_health, habit, intro]
        );
        const id = idResult.rows[0].id;

        if (files.image) {
            const imgArr: formidable.File[] = Array.isArray(files.image)
                ? files.image
                : [files.image];

            for (let i = 0; i < imgArr.length; i++) {
                const img = imgArr[i].newFilename;
                dbClient.query("INSERT INTO cat_image (cat_id,c_image) VALUES ($1,$2)", [id, img]);
            }
        }

        if (files.video) {
            const videoArr: formidable.File[] = Array.isArray(files.video)
                ? files.video
                : [files.video];
            for (let i = 0; i < videoArr.length; i++) {
                const video = videoArr[i].newFilename;
                dbClient.query("INSERT INTO cat_video (cat_id,c_video) VALUES ($1,$2)", [
                    id,
                    video,
                ]);
            }
        }

        res.json({ success: true });
    });
});

// catPostRoute.get("",getAllPost);
// catPostRoute.put("",updatePost);
// catPostRoute.delete("",deletePost);
