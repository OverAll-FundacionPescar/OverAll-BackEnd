import { Router } from "express";
import * as faq from "../controllers/faq.js"
const faqRouter = Router();

faqRouter.get("/", faq.getFaq)

export default faqRouter;