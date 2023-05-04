import { volLoginController } from "../server";
// import { vol_register_controller } from "../server";
import { user_login_Controller } from "../server";
// import { user_register_Controller } from "../server";
import { user_register_Controller } from "../server";

import express from "express";

export const public_main_route = express.Router();

// from  ../controllers/vol_login_controller.ts
public_main_route.post("/volunteer_login", volLoginController.vol_login);

// from  ../controllers/vol_profile_controller.ts
// public_main_route.post("/volunteer_register", vol_register_controller.vol_register);

// // from ../controllers/user_login_controller.ts
public_main_route.post("/user_login", user_login_Controller.user_login);

// // from ../controllers/user_register_controller.ts
public_main_route.post("/", user_register_Controller.user_register);
