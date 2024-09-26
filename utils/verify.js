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
            return  res.redirect("/signin/login");
        }
        console.log("Verificando...")
        console.log("")
        const decoded = jwt.verify(token, SECRETWORD);
        const resultados = await User.find({ _id: decoded._id });
        
                if (!resultados) {
                    return  res.redirect("/signin/login");
                } 
            } catch(err) {
                console.log(err)
            }
}


//Busca el id que corresponda al token 
export const search = async (req, res) => {
    try {
        const token = req.cookies.token
        const tokenid = jwt.verify(token, SECRETWORD)
        return tokenid.id
    
    }catch(err) {
        console.log(err)
    }
}