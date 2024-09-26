import User from "../models/user.js";
import bcrypt from "bcrypt"
import { authenticate, verify, search } from "../utils/index.js";
import jwt from "jsonwebtoken"

const SECRETWORD = "overAllAguante";
export const getProfile =async (req, res) => {
    
    //Verifica que el user tenga token y sino pal login compa
    verify(req, res)
    return res.render("profile", {estilos:"/profile_resources/styles//styles_perfil.css"})


}

export const getProfileId = async (request, response) => {

    try{
    //validamos para que si no tiene token se registre
    verify(request, response)

    let owner = false
    
    //Pedimos el id del url
    const profileId = request.params.id;

    //solicitamos el token del usuario
    const ownerId = await search(request, response)
    
    if (profileId == ownerId){
        owner = true
    }
    console.log(owner)
    let ownprofile = ownerId
    //Buscamos al usuario
    const profileUserInfo = await User.findById(profileId)
    const profileViewerInfo = await User.findById(ownerId)
    //Devolvemos error si no hay tal user
    if(!profileUserInfo){
        return response.json({title:"error", message:"Usuario no encontrado :c"})
    }

    //si hay devolvemos el perfil con los datos
    response.render("profile", {
        estilos:"/profile_resources/styles/styles_perfil.css",
        ownprofile:ownprofile,
        username:profileUserInfo.user, 
        especialidad:profileUserInfo.especialidad,
        edad:profileUserInfo.edad,
        localidad:profileUserInfo.localidad,
        email:profileUserInfo.email, owner:owner, user:profileViewerInfo.user
    })
    }catch(err) {console.log(err)}
    

} 

export const getProfileEdit = async (request, response) => {
    //hacemos la validacion de si el usuario es el mismo que perfil
    try{
        //procesamos el id del TOKEN
    const user = await search(request,response);
    
    console.log(user)
    //procesamos el id del BUSCADOR
    const ownerId = request.params.id;
    console.log("")
    console.log(ownerId)
    const userData = await User.findById(ownerId);
    
    //si no son iguales pateamos
    if(ownerId != user){
        response.redirect("/")
        //si son iguales procedemos a renderizar edit
    } else{
        response.render("edit", {
            estilos:"/profile_resources/styles/styles_perfil.css",
            ownprofile:request.params.id,
            user:userData.user, 
            especialidad:userData.especialidad,
            edad:userData.edad,
            localidad:userData.localidad,
            email:userData.email} )
        
    }
    } catch (err) {console.log(err)}
}

export const editProfile = async (request, response) => {
    console.log("-----------------------")
    console.log("Actualizando usuario")
    console.log("")
    const userId = request.params.id
    const update = request.body
    console.log({update})
    
    await User.updateOne({_id:userId}, update)
    response.json({
        title:"se actualizo",
        message:"todo bien anda a chequear"
    })
}