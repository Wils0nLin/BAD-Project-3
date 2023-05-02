import { volController } from "../server";
import express from "express";

export const volRoutes = express.Router();

volRoutes.post("/volunteer-login", volController.volLogin);
volRoutes.post("/volunteer-register", volController.volRegister);
volRoutes.get("/volunteer-profile", volController.volProfile);
volRoutes.put("/volunteer-profile-update", volController.volRegister);
volRoutes.get("/volunteer-post", volController.volPost);
volRoutes.delete("/volunteer-post/:id", volController.volPost);
volRoutes.post("/volunteer-post-create", volController.volPost);
volRoutes.get("/volunteer-post-info/:id", volController.volPostDetail);
volRoutes.post("/volunteer-post-update/:id", volController.volPostDetail);
volRoutes.get("/volunteer-case", volController.volCase);
volRoutes.get("/volunteer-case-info/:id", volController.volCaseDetail);