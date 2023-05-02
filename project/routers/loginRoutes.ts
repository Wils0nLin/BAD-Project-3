import { userLoginController, volLoginController } from "../server";
import express from "express";

export const userLoginRoutes = express.Router();
export const volLoginRoutes = express.Router();

userLoginRoutes.post("/login", userLoginController.userLoginControl);
volLoginRoutes.post("/login", volLoginController.volLoginControl);