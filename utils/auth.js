//clase encargada de brincdar y verificar tokens

import {token} from "morgan"
import User from "../models/user.js"
import jwt from "jsonwebtoken"


const SECRETWORD = "overAllAguante";



export const authenticate = async (payload) => {
    //payload == credenciales de usuario a authenticar
    const token = jwt.sign(payload, SECRETWORD, {expiresIn: "1h"})

    if(!token){
        return {message: "ha ocurrido un error"}
    } else {
        return token
    }
}




//MIDDLEWARE DESPRECIADO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export const verificar = async (request, response) => {
    console.log("------------VERIFICANDO------------")
    //Toma el header del request y lo chequea
    //divide el valor del encabezado AUTHORIZATION en 2 tomando el espacio en blanco como delimitador y toma el segundo item (token)
    console.log("-----Token extraido----")
    const authHeader = request.header("Authorization")
    console.log("----------")
    console.log("")
    const data = authHeader.split(" ")[1];
    console.log(data)
    console.log(decoded)
    console.log("-------------------")
    console.log("")
    
    //Busca al usuario decodificado
    const decoded = jwt.verify(data, SECRETWORD);
    const resultados = await User.find(decoded)
    if(!resultados > 0){
        response.render("login", {estilos: "/login_resources/login.css"})
    }
    //si hay sigue el proceso
    request.user = decoded
    console.log(resultados)
    //Si no hay usuario redirige
    next()
}