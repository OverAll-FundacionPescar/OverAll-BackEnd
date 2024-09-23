import jwt from "jsonwebtoken"
import User from "../models/user.js";

const SECRETWORD = "overAllAguante";



//Esta funcion reemplaza al midleware y no pierde el token
export const verify = async (req, res) => { 
    try{
        const token = req.cookies.token
        console.log(token)
        if (!token) {
            console.log("Reenviando a login")
            return  res.redirect("signin/login");
        }
        console.log("Verificando")
        const decoded = jwt.verify(token, SECRETWORD);
        const resultados = await User.find({ _id: decoded._id });
        console.log(resultados)
                if (!resultados) {
                    return  res.redirect("signin/login");
                } 
            } catch(err) {
                console.log(err)
            }
}