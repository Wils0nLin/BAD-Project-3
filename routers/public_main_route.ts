import { publicCatController } from "../server";
import { publicLoginController } from "../server";
import { publicRegisterController } from "../server";
import { publicForgotController } from "../server";

import express from "express";

export const public_main_route = express.Router();

// from  ../controllers/public/public_cat_controller.ts
public_main_route.get("/public_cat", publicCatController.public_cat);
public_main_route.get("/public_cat_info/:id", publicCatController.public_cat_info);
public_main_route.post("/predict", publicCatController.public_cat_verifying);

// from  ../controllers/public/public_login_controller.ts
public_main_route.post("/public_user_login", publicLoginController.public_user_login);
public_main_route.post("/public_volunteer_login", publicLoginController.public_vol_login);

// // from ../controllers/public/public_register_controller.ts
public_main_route.post("/public_user_register", publicRegisterController.public_user_register);
public_main_route.post("/public_volunteer_register", publicRegisterController.public_vol_register);

// // from ../controllers/public/public_forgot_controller.ts
public_main_route.post("/public_user_forgot", publicForgotController.public_user_forgot);
public_main_route.post("/public_volunteer_forgot", publicForgotController.public_vol_forgot);
public_main_route.put("/public_user_reset", publicForgotController.public_user_reset);
public_main_route.put("/public_volunteer_reset", publicForgotController.public_vol_reset);
