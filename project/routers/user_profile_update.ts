import express from "express";
import { dbClient } from "../server";
import type { Request, Response } from "express";

export const user_update = express.Router();

user_update.put("/:mid", updateProfile);

async function updateProfile(req: Request, res: Response) {
  const postId = +req.params.mid;
  const u_name = req.body.u_name;
  const u_email = req.body.u_email;
  const u_birth_date = req.body.u_birth_date;
  const u_phone_number = req.body.u_phone_number;
  const u_address = req.body.u_address;
  const home_size_id = req.body.home_size_id;
  const income_id = req.body.income_id;
  const exp = req.body.pet_before;
  const existedPet = req.body.existed_pet;
  const smoker = req.body.smoker;
  const isAllergy = req.body.is_allergy;
  const knowledge = req.body.knowledge;
  const future_plan = req.body.future_plan;
  console.log(u_birth_date);

  if (isNaN(postId)) {
    res.status(400).json({ message: "invalid id" });
    return;
  }

  await dbClient.query(
    `UPDATE users SET u_name = $1, u_email = $2 , u_birth_date =$3, u_phone_number = $4 , u_address = $5 ,
    home_size_id = $6,
    income_id = $7,
   pet_before = $8,
   existed_pet = $9,
   smoker = $10,
   is_allergy = $11,
   knowledge = $12,
   future_plan = $13
    where id = $14`,
    [
      u_name,
      u_email,
      u_birth_date,
      u_phone_number,
      u_address,
      home_size_id,
      income_id,
      exp,
      existedPet,
      smoker,
      isAllergy,
      knowledge,
      future_plan,
      postId,
    ]
  );
  res.json({ message: "success" });
}
