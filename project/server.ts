import express from "express";
import expressSession from "express-session";
import path from "path";
import pg from "pg";
import type { Request, Response, NextFunction } from "express";

//try
import dotenv from "dotenv";
dotenv.config();
import Knex from "knex";
import knexConfig from "./knexfile";
//

export const dbClient = new pg.Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
});
dbClient.connect();

//try
const knex: any = Knex(knexConfig[process.env.NODE_ENV || "development"]);
//try

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


// ------------------------------ Controller Import ------------------------------ //
// Public Controller
import { public_cat_controller } from "./controllers/public/public_cat_controller";
import { user_login_controller } from "./controllers/public/user_login_controller";
import { vol_login_controller } from "./controllers/public/vol_login_controller";
import { public_register_controller } from "./controllers/public/public_register_controller";
import { public_forgot_controller } from "./controllers/public/public_forgot_controller";

// User Controller
import { user_apply_controller } from "./controllers/user/user_apply_controller";
import { user_adopt_form_controller } from "./controllers/user/user_adopt_form_controller";
import { user_cat_adopt_controller } from "./controllers/user/user_cat_adopt_controller";
import { user_event_insert_controller } from "./controllers/user/user_event_insert_controller";
import { user_get_data_edit_case_controller } from "./controllers/user/user_get_data_edit_case_controller";
import { user_profile_data_controller } from "./controllers/user/user_profile_data_controller";
// By Tyson

// Volunteer Controller
import { vol_profile_controller } from "./controllers/volunteer/vol_profile_controller";
import { vol_post_controller } from "./controllers/volunteer/vol_post_controller";
import { vol_case_controller } from "./controllers/volunteer/vol_case_controller";
// By Wilson

// ------------------------------- Service Import -------------------------------- //
// Public Service
import { public_cat_service } from "./services/public/public_cat_service";
import { user_login_service } from "./services/public/user_login_service";
import { vol_login_service } from "./services/public/vol_login_service";
import { public_register_service } from "./services/public/public_register_service";
import { public_forgot_service } from "./services/public/public_forgot_service";

const publicCatService = new public_cat_service(knex);
export const publicCatController = new public_cat_controller(publicCatService);
const user_login_Service = new user_login_service(knex);
export const user_login_Controller = new user_login_controller(user_login_Service);
const volLoginService = new vol_login_service(knex);
export const volLoginController = new vol_login_controller(volLoginService);
const publicRegisterService = new public_register_service(knex);
export const publicRegisterController = new public_register_controller(publicRegisterService);
const publicForgotService = new public_forgot_service(knex);
export const publicForgotController = new public_forgot_controller(publicForgotService);

// User Service
import { user_apply_service } from "./services/user/user_apply_service";
import { user_adopt_form_service } from "./services/user/user_adopt_form_service";
import { user_cat_adopt_service } from "./services/user/user_cat_adopt_service";
import { user_event_insert_service } from "./services/user/user_event_insert_service";
import { user_get_data_edit_case_service } from "./services/user/user_get_data_edit_case_service";
import { user_profile_data_service } from "./services/user/user_profile_data_service";

const user_apply_Service = new user_apply_service(knex);
export const user_apply_Controller = new user_apply_controller(user_apply_Service);
const user_adopt_form_Service = new user_adopt_form_service(knex);
export const user_adopt_form_Controller = new user_adopt_form_controller(user_adopt_form_Service);
const user_cat_adopt_Service = new user_cat_adopt_service(knex);
export const user_cat_adopt_Controller = new user_cat_adopt_controller(user_cat_adopt_Service);
const user_event_insert_Service = new user_event_insert_service(knex);
export const user_event_insert_Controller = new user_event_insert_controller(user_event_insert_Service);
const user_get_data_edit_case_Service = new user_get_data_edit_case_service(knex);
export const user_get_data_edit_case_Controller = new user_get_data_edit_case_controller(user_get_data_edit_case_Service);
const user_profile_data_Service = new user_profile_data_service(knex);
export const user_profile_data_Controller = new user_profile_data_controller(user_profile_data_Service);
// By Tyson

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
// By Wilson


// ------------------------------- Route Handlers -------------------------------- //
import { public_main_route } from "./routers/public_main_route";
import { user_main_route } from "./routers/user_main_route";
import { vol_main_route } from "./routers/vol_main_route";
app.use(public_main_route);
app.use(user_main_route);
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
app.use(volMiddleware, express.static(path.join(__dirname, "private", "volPrivate")));


// ------------------------------ Error Handling ------------------------------ //
app.use((_req, res) => {
    res.sendFile(path.join(__dirname, "public", "404.html"));
});


// ------------------------------ ------------------------------ //
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});
