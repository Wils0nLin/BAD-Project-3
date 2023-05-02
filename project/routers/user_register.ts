import express from "express";
import { hashPassword } from "./hash";
import { dbClient } from "../server";
import type { Request, Response } from "express";

export const registerRoute = express.Router();

// user_selfProfileEdit.html to modify user information
registerRoute.put("/:mid", updateProfile);

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

//Register User
registerRoute.post("/", async (req, res) => {
  const u_username = req.body.u_username;
  const u_password = req.body.u_password;
  const u_name = req.body.u_name;
  const u_email = req.body.u_email;
  const u_birth_date = req.body.u_birth_date;
  const u_phone_number = req.body.u_phone_number;
  const u_address = req.body.u_address;
  const home_size_id = req.body.home_size_id;
  const income_id = req.body.income_id;
  const existed_pet = req.body.existed_pet;
  const pet_before = req.body.pet_before;
  const is_allergy = req.body.is_allergy;
  const smoker = req.body.smoker;
  const knowledge = req.body.knowledge;
  const future_plan = req.body.future_plan;

  let hashed = await hashPassword(u_password);

  //insert users to database users
  try {
    const result = await dbClient.query(
      /*SQL*/
      `INSERT INTO users (u_username, u_password, u_name, u_email, u_birth_date, u_phone_number ,u_address, home_size_id, income_id, existed_pet, pet_before, is_allergy, smoker, knowledge, future_plan)
      VALUES ($1, $2, $3 ,$4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING id`,

      [
        u_username,
        hashed,
        u_name,
        u_email,
        u_birth_date,
        u_phone_number,
        u_address,
        home_size_id,
        income_id,
        existed_pet,
        pet_before,
        is_allergy,
        smoker,
        knowledge,
        future_plan,
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// http://localhost:8080/user_register/user
// registerRoute.get("/user", (req: express.Request, res: express.Response) => {
//   res.end();
// });