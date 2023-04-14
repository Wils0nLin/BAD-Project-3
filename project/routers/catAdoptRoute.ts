import { dbClient } from "../server";
import express from "express";
import type { Request, Response } from "express";

export const catAdoptRoute = express.Router();
export const catProfileRoute = express.Router();

catAdoptRoute.get("/catAdoptData", getAllCats);
catAdoptRoute.get("/catAdoptData/:id", getCatsDetails);

//---- For catAdoptPage(public , user, volunteer)----//
async function getAllCats(req: Request, res: Response) {
    try {
        const resultQuery = await dbClient.query(
            `WITH temp AS (
        SELECT MIN(id) AS id, cat_id FROM cat_image GROUP BY cat_id
    )
    SELECT cats.id, c_name, intro, cats.gender, cat_image.id AS c_image_id, cat_image.c_image FROM cats 
    LEFT JOIN temp ON cats.id = temp.cat_id
    INNER JOIN cat_image ON temp.id = cat_image.id where cats.is_shown = true;`
        );
        res.json(resultQuery.rows);
    } catch (err) {
        res.status(500).json({ message: "server error" });
    }
}

//----For One Cat Details -----//
async function getCatsDetails(req: Request, res: Response) {
    try {
        const postId = parseInt(req.params.id, 10);
        if (isNaN(postId)) {
            res.status(400).json({ message: "invalid cat id" });
        }

        const resultQuery = await dbClient.query(
            `SELECT cats.* , cat_image.c_image , cat_video.c_video, volunteers.v_name, volunteers.v_email , volunteers.v_phone_number  FROM cats 
      JOIN cat_image ON cats.id = cat_image.cat_id 
      LEFT JOIN cat_video ON cats.id = cat_video.cat_id
      JOIN volunteers ON cats.volunteer_id = volunteers.id
      where cats.id = $1;`,
            [postId]
        );
        //JOIN cat_video ON cats.id = cat_video.cat_id    join唔到cat_video
        res.json(resultQuery.rows[0]);
    } catch (err) {
        res.status(500).json({ message: "server error" });
    }
}

//------For catProfileData-----------//
catProfileRoute.get("/catProfileData", async (req, res) => {
    const queryResult = await dbClient.query(
        `SELECT * FROM cats
    INNER JOIN cat_image
    ON cats.id = cat_image.cat_id
    INNER JOIN cat_video
    ON cats.id = cat_video.cat_id;`
    );
    const catProfile = queryResult.rows[0];
    res.json(catProfile);
});

//-------- Edit Route -------------//
catAdoptRoute.patch("/catAdoptData/:id", async (req, res) => {
    const postId = parseInt(req.params.id, 10);

    if (isNaN(postId)) {
        res.status(400).json({ message: "invalid post id" });
        return;
    } else {
        res.json({ message: "success" });

        await dbClient.query(`UPDATE FROM cat_image where cat_id = $1;`, [postId]);
        await dbClient.query(`UPDATE FROM cats where id = $1;`, [postId]);
    }
});
