import express from "express";
import { hashPassword } from "./hash";
import { dbClient } from "../server";
import type { Request, Response } from "express";

export const volunteer_registerRoute = express.Router();

// vol_selfProfileEdit.html to modify volunteer information
volunteer_registerRoute.put("/:mid", updateProfile);

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

//Register Volunteer User
volunteer_registerRoute.post("/", async (req, res) => {
  const v_username = req.body.v_username;
  const v_password = req.body.v_password;
  const v_name = req.body.v_name;
  const v_email = req.body.v_email;
  const v_birth_date = req.body.v_birth_date;
  const v_phone_number = req.body.v_phone_number;
  const v_address = req.body.v_address;

  let hashed = await hashPassword(v_password);

  //insert users to database users
  try {
    const result = await dbClient.query(
      /*SQL*/
      `INSERT INTO volunteers (v_username, v_password, v_name, v_email, v_birth_date, v_phone_number ,v_address )
      VALUES ($1, $2, $3 ,$4, $5, $6, $7)
      RETURNING id`,

      [v_username, hashed, v_name, v_email, v_birth_date, v_phone_number, v_address]
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
