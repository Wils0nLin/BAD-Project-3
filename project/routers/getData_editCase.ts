import express from "express";
import { dbClient } from "../server";
import type { Request, Response } from "express";

export const getDataEditCase = express.Router();

//Modify Cat Info
getDataEditCase.post("/getEditCaseDetails/:caseId", updateCatProfile);

async function updateCatProfile(req: Request, res: Response) {
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

    await dbClient.query(
        `UPDATE cats SET  age  = $1, gender = $2 , breed = $3 , character = $4, food_habits  = $5, cat_health = $6 , intro = $7 where id  = $8`,
        [age, gender, breed, characters, food_habits, cat_health, intro, caseId]
    );
    res.json({ message: "success" });
}

// Get Cat Info
getDataEditCase.get("/getEditCaseDetails/:caseId", async (req, res) => {
    const queryResult = await dbClient.query(
        `SELECT
json_agg(cat_video.c_video) AS video,
json_agg(cat_image.c_image) AS img,
cats.c_name AS cat_name,
cats.intro AS intro,
cats.age AS age,
cats.gender AS gender,
cats.breed AS breed,
cats.character AS characters,
cats.cat_health AS cat_health,
cats.food_habits AS food_habits   
from cats 
JOIN cat_image on cat_image.cat_id = cats.id 
LEFT JOIN cat_video on cat_video.cat_id = cats.id
where cats.id =${req.params.caseId}
GROUP BY    
cats.c_name,
cats.intro,
cats.age,
cats.gender,
cats,breed,
cats.character,
cats.cat_health,
cats.food_habits
;`
    );
    res.json(queryResult.rows[0]);
});
