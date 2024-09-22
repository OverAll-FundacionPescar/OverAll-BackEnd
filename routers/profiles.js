import { Router } from "express";
import * as pr from "../controllers/profiles.js"

const profilesRouter = Router();

profilesRouter.get("/", pr.getProfile)

profilesRouter.post("/")


export default profilesRouter;