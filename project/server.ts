import express from "express";
import expressSession from "express-session";
import path from "path";
import pg from "pg";
import type { Request, Response, NextFunction } from "express";

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

import { vol_login_controller } from "./controllers/public/vol_login_controller";
import { vol_login_service } from "./services/public/vol_login_service";

//
// ------------------------------ Route Handlers ------------------------------ //
import { registerRoute } from "./routers/user_register";
import { volunteer_registerRoute } from "./routers/volunteer_register";
import { userLoginRoute } from "./routers/userLoginRoute";
// import { volLoginRoute } from "./routers/volLoginRoute";
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
import { vol_update } from "./routers/vol_profile_update";
import { user_update } from "./routers/user_profile_update";

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
// app.use(volLoginRoute);
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

const volLoginService = new vol_login_service(dbClient);
export const volLoginController = new vol_login_controller(volLoginService);
import { public_main_route } from "./routers_new/public_main_route";
app.use(public_main_route);

// ---------- Profile Page ---------- //
app.use(userProfileRoute);
app.use(volProfileRoute);
app.use("/vol_update", vol_update);
app.use(catProfileRoute);
app.use('/user_profile_update',user_update)
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
const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.isLoggedIn) next();
    else res.redirect("/");
};
app.use(userMiddleware, express.static(path.join(__dirname, "private", "userPrivate")));
// ---------- Volunteer Login ---------- //
const volMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.isLoggedIn) next();
    else res.redirect("/");
};
app.use(volMiddleware, express.static(path.join(__dirname, "private", "volPrivate")));

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
