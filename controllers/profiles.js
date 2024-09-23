import User from "../models/user.js";
import bcrypt from "bcrypt"
import { authenticate, verify } from "../utils/index.js";
import jwt from "jsonwebtoken"

const SECRETWORD = "overAllAguante";
export const getProfile =async (req, res) => {
    
    //Verifica que el user tenga token y sino pal login compa
    verify(req, res)
    return res.render("profile", {estilos:"/profile_resources/styles//styles_perfil.css"})


}

export const getProfileId = async (request, response) => {
    //validamos para que si no tiene token se registre
    verify(request, response)

    let owner = false
    
    //Pedimos el id del url
    const profileId = request.params.id;

    //solicitamos el token del usuario
    const usertoken = request.cookies.token
    const decoded = jwt.verify(usertoken, SECRETWORD);
    if (profileId == decoded.id){
        owner = true
    }
    console.log(owner)
    let ownprofile = decoded.id
    //Buscamos al usuario
    const profileUserInfo = await User.findById(profileId)
    //Devolvemos error si no hay tal user
    if(!profileUserInfo){
        return response.json({title:"error", message:"Usuario no encontrado :c"})
    }

    //si hay devolvemos el perfil con los datos
    response.render("profile", {
        estilos:"/profile_resources/styles/styles_perfil.css",
        ownprofile:ownprofile,
        user:profileUserInfo.user, 
        especialidad:profileUserInfo.especialidad,
        edad:profileUserInfo.edad,
        localidad:profileUserInfo.localidad,
        email:profileUserInfo.email, owner:owner
    })
} 

export const getProfileEdit = (request, response) => {

}