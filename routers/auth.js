import * as authContr from "../controllers/auth.js"
import {Router} from "express"
 


const authR = Router();


authR.get("/", authContr.signinPage); //retorna la vista

authR.post("/", authContr.register) //Crea usuario y valida

authR.get("/login", authContr.loginForm) //retorna el login

authR.post("/login", authContr.getLogin) //Retorna token



export default authR;