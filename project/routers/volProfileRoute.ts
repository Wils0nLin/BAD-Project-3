import { dbClient } from "../server";
import express from "express";

export const volProfileRoute = express.Router();

interface User {
  id: number;
}

volProfileRoute.get("/volunteerProfileData", async (req, res) => {
  const queryResult = await dbClient.query<User>(
    `SELECT * FROM volunteers WHERE v_username = '${req.session.username}'`
  );
  const volProfile = queryResult.rows[0];
  res.json(volProfile);
});
