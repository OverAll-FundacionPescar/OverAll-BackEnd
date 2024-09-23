import { Router } from "express";
import * as pr from "../controllers/profiles.js"

const profilesRouter = Router();

profilesRouter.get("/", pr.getProfile)

profilesRouter.get("/:id", pr.getProfileId)
profilesRouter.get("/edit/:id", pr.getProfileEdit)

export default profilesRouter;