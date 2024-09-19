import * as authContr from "../controllers/auth.js"
import {Router} from "express"


const authR = Router();


authR.get("/", authContr.signinPage); //retorna la vista

authR.post("/", authContr.register) //Crea usuario y valida

authR.get("/login", authContr.getLogin) //retorna el login
export default authR;