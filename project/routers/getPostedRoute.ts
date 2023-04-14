import express from "express";
import { dbClient } from "../server";

export const getPostedRoute = express.Router();

getPostedRoute.get("/volPostedCat", async (req, res) => {
    if (req.session.userType == "volunteer") {
        const PostedCat = await dbClient.query(`WITH temp AS (
        SELECT MIN(id) AS id, cat_id FROM cat_image GROUP BY cat_id
    )
    SELECT volunteer_id, cats.id, c_name, intro, gender, cat_image.id AS c_image_id, cat_image.c_image FROM cats 
    LEFT JOIN temp ON cats.id = temp.cat_id
    INNER JOIN cat_image ON temp.id = cat_image.id WHERE volunteer_id = ${req.session.userid} AND cats.is_shown = true`);

        res.json(PostedCat.rows);
    } else {
        res.json({ message: "you are not volunteer" });
    }
});

//-------- Detete Route(修改成不刪除database的資料，需在Database中的cats加入column "is_shown")----------//

getPostedRoute.delete("/volPostedCat/:id", async (req, res) => {
    const postId = +req.params.id;

    if (isNaN(postId)) {
        res.status(400).json({ message: "invalid post id" });
        return;
    } else {
        res.json({ message: "success" });

        const foundCat = await dbClient.query(
            `Select cats.is_shown FROM cats where cats.id = $1;`,
            [postId]
        );

        if (foundCat) {
            await dbClient.query(`UPDATE cats set is_shown = false where cats.id = $1;`, [postId]);
        }
    }
});
