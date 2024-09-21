//clase encargada de brincdar y verificar tokens

import {token} from "morgan"
import User from "../models/user.js"
import jwt from "jsonwebtoken"

//Configuramos dotenv para reconocer archivos .env

const SECRETWORD = "overAllAguante";

export const authenticate = async (payload) => {
    //payload == credenciales de usuario a authenticar
    const token = jwt.sign(payload, SECRETWORD, {expiresIn: "1h"})

    if(!token){
        return {message: "ha ocurrido un error"}
    } else {
        return {token}
    }
}

export const verificar = async (request, response) => {
    console.log("------------VERIFICANDO------------")
    //Toma el header del request y lo chequea
    //divide el valor del encabezado AUTHORIZATION en 2 tomando el espacio en blanco como delimitador y toma el segundo item (token)
    const data = request.cookie("Authorization").split(" "[1]);
    const decoded = jwt.verify(data, SECRETWORD);

    //Busca al usuario decodificado
    const resultados = await User.find(decoded)

    //Si no hay usuario redirige
    if(!resultados > 0){
        response.render("login", {estilos: "/login_resources/login.css"})
    }
    //si hay sigue el proceso
    response.json(resultados.user)
    next()
}