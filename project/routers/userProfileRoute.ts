import { dbClient } from "../server";
import express from "express";

// import { checkPassword } from "./hash";
// import { userLoginRoute } from "./userLoginRoute";

export const userProfileRoute = express.Router();

interface User {
  id: number;
  // u_username: string;
  // u_password: string;
}

//增加 select income_value and home_size
userProfileRoute.get("/userProfileData", async (req, res) => {
  const queryResult = await dbClient.query<User>(
    `SELECT users.* , income_value, home_size FROM users 
        JOIN income ON users.income_id = income.id
        JOIN home_size ON users.home_size_id = home_size.id
    WHERE u_username = '${req.session.username}'`
  );
  const userProfile = queryResult.rows[0];
  res.json(userProfile);
});
