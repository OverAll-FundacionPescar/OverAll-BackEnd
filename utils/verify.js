import jwt from "jsonwebtoken"
import User from "../models/user.js";

const SECRETWORD = "overAllAguante";



//Esta funcion reemplaza al midleware y no pierde el token
export const verify = async (req, resp) => { 
    console.log("verificando...")
    const token = req.cookies.token
    if(token){
        const decoded = jwt.verify(token, SECRETWORD);
        const resultados = await User.find(decoded)
        if(!resultados > 0){
            return resp.render("login", {estilos: "/login_resources/login.css"})
        }
    //si hay sigue el proceso
    req.user = decoded
    console.log("todo piola sigue")
    }
}