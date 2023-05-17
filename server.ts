import express from "express";
import expressSession from "express-session";
import path from "path";
import type { Request, Response, NextFunction } from "express";

//try
import dotenv from "dotenv";
dotenv.config();
import Knex from "knex";
import knexConfig from "./knexfile";

//try
const knex: any = Knex(knexConfig[process.env.NODE_ENV || "development"]);

declare module "express-session" {
    interface SessionData {
        isLoggedIn?: boolean;
        userId?: number;
        userType?: string;
        catId?: number;
        caseId?: number;
        postId?: number;
        applyId?: number;
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

// ------------------------------ Controller Import ------------------------------ //
// Public Controller
import { public_cat_controller } from "./controllers/public/public_cat_controller";
import { public_login_controller } from "./controllers/public/public_login_controller";
import { public_register_controller } from "./controllers/public/public_register_controller";
import { public_forgot_controller } from "./controllers/public/public_forgot_controller";

// User Controller
import { user_profile_controller } from "./controllers/user/user_profile_controller";
import { user_apply_controller } from "./controllers/user/user.controller";

// Volunteer Controller
import { vol_profile_controller } from "./controllers/volunteer/vol_profile_controller";
import { vol_post_controller } from "./controllers/volunteer/vol_post_controller";
import { vol_case_controller } from "./controllers/volunteer/vol_case_controller";

// ------------------------------- Service Import -------------------------------- //
// Public Service
import { public_cat_service } from "./services/public/public_cat_service";
import { public_login_service } from "./services/public/public_login_service";
import { public_register_service } from "./services/public/public_register_service";
import { public_forgot_service } from "./services/public/public_forgot_service";

const publicCatService = new public_cat_service(knex);
export const publicCatController = new public_cat_controller(publicCatService);
const publicLoginService = new public_login_service(knex);
export const publicLoginController = new public_login_controller(publicLoginService);
const publicRegisterService = new public_register_service(knex);
export const publicRegisterController = new public_register_controller(publicRegisterService);
const publicForgotService = new public_forgot_service(knex);
export const publicForgotController = new public_forgot_controller(publicForgotService);

// User Service
import { user_profile_service } from "./services/user/user_profile_service";
import { UserApplyService } from "./services/user/user.service";

const userProfileService = new user_profile_service(knex);
export const userProfileController = new user_profile_controller(userProfileService);
const userApplyService = new UserApplyService(knex);
export const userApplyController = new user_apply_controller(userApplyService);

// Volunteer Service
import { vol_profile_service } from "./services/volunteer/vol_profile_service";
import { vol_post_service } from "./services/volunteer/vol_post_service";
import { vol_case_service } from "./services/volunteer/vol_case_service";

const volProfileService = new vol_profile_service(knex);
export const volProfileController = new vol_profile_controller(volProfileService);
const volPostService = new vol_post_service(knex);
export const volPostController = new vol_post_controller(volPostService);
const volCaseService = new vol_case_service(knex);
export const volCaseController = new vol_case_controller(volCaseService);

// ------------------------------- Route Handlers -------------------------------- //
import { public_main_route } from "./routers/public_main_route";
// import { user_main_route } from "./routers/user_main_route";
import { vol_main_route } from "./routers/vol_main_route";
app.use(public_main_route);
// app.use('/user', user_main_route);
app.use("/user", userApplyController.router);
app.use(vol_main_route);

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
app.use(volMiddleware, express.static(path.join(__dirname, "private", "VolPrivate")));

// ------------------------------ Error Handling ------------------------------ //
app.use((_req, res) => {
    res.sendFile(path.join(__dirname, "public", "404.html"));
});

// ------------------------------ ------------------------------ //
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});
