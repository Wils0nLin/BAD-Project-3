import express from "express";
import expressSession from "express-session";
import path from "path";
import pg from "pg";

import dotenv from "dotenv";
dotenv.config();

export const dbClient = new pg.Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
});
dbClient.connect();

declare module "express-session" {
    interface SessionData {
        isLoggedIn?: boolean;
        userid?: number;
        username?: string;
        userType?: string;
        caseID?: number;
        catId?: number;
    }
}

const app = express();
//
// ------------------------------ Middleware ------------------------------ //
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    expressSession({
        secret: "Cat Platform typescript",
        resave: true,
        saveUninitialized: true,
    })
);

app.use((req, _res, next) => {
    console.log(`Path ${req.path}, Method: ${req.method}`);
    next();
});

//
// ------------------------------ Route Handlers ------------------------------ //
import { registerRoute } from "./routers/user_register";
import { volunteer_registerRoute } from "./routers/volunteer_register";
import { userLoginRoute } from "./routers/userLoginRoute";
import { volLoginRoute } from "./routers/volLoginRoute";
import { userProfileRoute } from "./routers/userProfileRoute";
import { volProfileRoute } from "./routers/volProfileRoute";
import { catPostRoute } from "./routers/catPostRoutes";
import { userApply } from "./routers/userApply";
import { getPostedRoute } from "./routers/getPostedRoute";
import { getDataEditCase } from "./routers/getData_editCase";
import { volInsert } from "./routers/VolEventInsert";
import { userInsert } from "./routers/userEventInsert";
import {
    applyStatusRoute,
    adoptStatusRoute,
    adoptFormRoute,
    pendingCaseRoute,
} from "./routers/adoptFormRoute";
import { catAdoptRoute, catProfileRoute } from "./routers/catAdoptRoute";
import { userAdoptFromroute } from "./routers/adoptFormRoute";
import { userMiddleware, volMiddleware } from "./utils/guard";
// ---------- User Register ---------- //
app.use("/user_register", registerRoute);
// ---------- Volunteer Register ---------- //
app.use("/volunteer_register", volunteer_registerRoute);
// ---------- User Login ---------- //
app.use("/user_loginRoute", userLoginRoute);
app.get("/userloginstatus", (req, res) => {
    if (req.session.isLoggedIn) {
        const userLoginInfo = {
            userid: req.session.id,
            username: req.session.username,
            userType: req.session.userType,
        };
        res.status(200).json(userLoginInfo);
    } else {
        res.status(200).json({ message: "Not Logged in" });
    }
});
// ---------- Volunteer Login ---------- //
app.use(volLoginRoute);
app.get("/volunteerloginstatus", (req, res) => {
    if (req.session.isLoggedIn) {
        const volLoginInfo = {
            userid: req.session.id,
            username: req.session.username,
            userType: req.session.userType,
        };
        res.status(200).json(volLoginInfo);
    } else {
        res.status(200).json({ message: "Not Logged in" });
    }
});
// ---------- Profile Page ---------- //
app.use(userProfileRoute);
app.use(volProfileRoute);
app.use(catProfileRoute);
// ---------- Adoption Posting Page ---------- //
app.use(catPostRoute);
app.use(catAdoptRoute);
// ---------- Adoption Review Page ---------- //
app.use(applyStatusRoute);
app.use(adoptStatusRoute);
app.use(adoptFormRoute);
app.use(pendingCaseRoute);
app.use(userAdoptFromroute);
app.use(userApply);
app.use(getPostedRoute);
app.use(getDataEditCase);
app.use(volInsert);
app.use(userInsert);

//
// ------------------------------ Serve ------------------------------ //
app.use(express.static("public"));
app.use(express.static("uploads"));
// ---------- User Login ---------- //
app.use(userMiddleware, express.static(path.join(__dirname, "private", "userPrivate")));
// ---------- Volunteer Login ---------- //
app.use(volMiddleware, express.static(path.join(__dirname, "private", "volPrivate")));
app.use(express.static("private"));

//
// ------------------------------ Error Handling ------------------------------ //
app.use((_req, res) => {
    res.sendFile(path.join(__dirname, "public", "404.html"));
});

//
// ------------------------------ ------------------------------ //
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});