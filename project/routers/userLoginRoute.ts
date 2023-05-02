import { dbClient } from "../server";
import { checkPassword } from "./hash";
import express from "express";

export const userLoginRoute = express.Router();
export const userOtherRoute = express.Router();

interface User {
    id: number;
    u_username: string;
    u_password: string;
    u_phone_number: number;
    u_email: string;
}

// ---------- User Login ---------- //
userLoginRoute.post("/userlogin", async (req, res) => {
    const username: string = req.body.username;
    const password: string = req.body.password;
    if (!username || !password) {
        res.status(400).json({ message: "missing username or password" });
        return;
    }

    const queryResult = await dbClient.query<User>(
        /*SQL*/ `SELECT id, u_username, u_password FROM users WHERE u_username = '${username}';`
    );
    const foundUser = queryResult.rows[0];

    if (!foundUser) {
        res.status(400).json({ message: "invalid username or password" });
        return;
    }

    const match = await checkPassword(password, foundUser.u_password);
    if (match) {
        req.session.isLoggedIn = true;
        req.session.userid = foundUser.id;
        req.session.username = foundUser.u_username;
        req.session.userType = "user";
        res.status(200).json({ message: "login success" });
    } else {
        res.status(400).json({ message: "invalid username or password" });
        return;
    }
});

// ---------- User Forgot Password ---------- //
// userOtherRoute.post("/userOtherLogin", async (req, res) => {
//     const username: string = req.body.username;
//     const phone: number = req.body.phone;
//     const email: number = req.body.email;

//     if (!username || !phone) {
//         res.status(400).json({ message: "missing username or password" });
//         return;
//     }

//     const queryResult = await dbClient.query<User>(
//         /*SQL*/ `SELECT id, u_username, u_password FROM users WHERE u_username = '${username}';`
//     );
//     const foundUser = queryResult.rows[0];

//     if (!foundUser) {
//         res.status(400).json({ message: "invalid username or password" });
//         return;
//     }

//     const match = await checkPassword(password, foundUser.u_password);
//     if (match) {
//         req.session.isLoggedIn = true;
//         req.session.userid = foundUser.id;
//         req.session.username = foundUser.u_username;
//         req.session.userType = "user";
//         res.status(200).json({ message: "login success" });
//     } else {
//         res.status(400).json({ message: "invalid username or password" });
//         return;
//     }
// });
