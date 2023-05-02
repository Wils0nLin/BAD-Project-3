import express from "express";
import formidable from "formidable";
import { form } from "./formidable";
import { dbClient } from "../server";


export const userApply = express.Router();

userApply.post("/applyForm", async (req, res) => {
    form.parse(req, async (err, fields, files) => {
        const user_id = fields.user_id;
        const cat_id = fields.cat_id;

        const form_id = await dbClient.query(`INSERT INTO adopt_forms (cat_id,user_id,adopt_status) VALUES ($1,$2,'pending') RETURNING id`,[cat_id,user_id]);
        
 
       
            const imgArr: formidable.File[] = Array.isArray(files.image) ? files.image : [files.image];
            
            for (let i = 0; i < imgArr.length; i++) {
                const img = imgArr[i].newFilename;
                
                dbClient.query(`INSERT INTO form_images (adopt_forms_id,f_image) VALUES ($1,$2)`,[form_id.rows[0].id,img]); 
                
              }
    });
    res.json({ success: true });
});
