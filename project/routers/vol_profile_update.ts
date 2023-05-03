// vol_selfProfileEdit.html to modify volunteer information

import express from "express";
import { dbClient } from "../server";
import type { Request, Response } from "express";


export const vol_update = express.Router();

vol_update.put("/:mid", updateProfile);

async function updateProfile(req: Request, res: Response) {
  const postId = +req.params.mid;
  const v_name = req.body.v_name;
  const v_email = req.body.v_email;
  const v_birth_date = req.body.v_birth_date;
  const v_phone_number = req.body.v_phone_number;
  const v_address = req.body.v_address;

  if (isNaN(postId)) {
    res.status(400).json({ message: "invalid id" });
    return;
  }

  await dbClient.query(
    `UPDATE volunteers SET v_name = $1, v_email = $2 ,v_birth_date = $3, v_phone_number = $4 , v_address = $5 where id = $6`,
    [v_name, v_email, v_birth_date, v_phone_number, v_address, postId]
  );
  res.json({ message: "success" });
}
