// import { dbClient } from "../server";
import express from "express";
import { dbClient } from "../server";

export const userInsert = express.Router();

userInsert.post("/confirm/:caseID",async (req,res) => {
    console.log(req.params.caseID)
   console.log(req.body.date_id)
await dbClient.query(`UPDATE events set is_select = '1' WHERE id =${req.body.date_id}`);
await dbClient.query(`UPDATE events set is_show = '0' WHERE adopt_forms_id = ${req.params.caseID}`)
    res.json({succuss:true});
})