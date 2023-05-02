import { dbClient } from "../server";
import { checkPassword } from "./hash";
import express from "express";

export const volLoginRoute = express.Router();

interface Vol {
    id: number;
    v_username: string;
    v_password: string;
}

// ---------- Volunteer Login ---------- //
volLoginRoute.post("/volunteerlogin", async (req, res) => {
    const username: string = req.body.username;
    const password: string = req.body.password;
    if (!username || !password) {
        res.status(400).json({ message: "missing username or password" });
        return;
    }

    const queryResult = await dbClient.query<Vol>(
        /*SQL*/ `SELECT id, v_username, v_password FROM volunteers WHERE v_username = '${username}';`
    );
    const foundUser = queryResult.rows[0];

    if (!foundUser) {
        res.status(400).json({ message: "invalid username or password" });
        return;
    }

    const match = await checkPassword(password, foundUser.v_password);
    if (match) {
        req.session.isLoggedIn = true;
        req.session.userid = foundUser.id;
        req.session.username = foundUser.v_username;
        req.session.userType = "volunteer";
        res.status(200).json({ message: "login success" });
    } else {
        res.status(400).json({ message: "invalid username or password" });
        return;
    }
});
