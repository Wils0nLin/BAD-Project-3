import express from "express";
import { hashPassword } from "../utils/hash";
import { dbClient } from "../server";

export const volunteer_registerRoute = express.Router();


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
