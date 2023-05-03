import { vol_login_controller } from "../server";
import { vol_profile_controller } from "../server";

import express from "express";

export const public_main_routes = express.Router();

// from  ../controllers/vol_login_controller.ts
public_main_routes.post("/volunteer_login", vol_login_controller.vol_login);

// from  ../controllers/vol_profile_controller.ts
public_main_routes.post("/volunteer_register", vol_profile_controller.vol_profile);