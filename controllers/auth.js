//Controlador para devolver vistas y manejar creacion de usuarios
import User from "../models/user.js";

import { authenticate } from "../utils/auth.js";
import bcrypt from "bcrypt"

//Renderiza registro
export const signinPage = (req, resp) => {
    console.log(req.body.user)
    resp.render("signin", {estilos:"/signin_resources/styles_registro.css"});
}
export const loginForm = async (req, resp) => {
    resp.render("login", {estilos: "/login_resources/login.css"})
}

export const register = async (req, resp) => {


    //Extraemos los datos
    const {user, email, location, edad, password1, password2} = req.body
    
    //Verificamos ambas pass
        if( password1 == password2){
            const securePass = await bcrypt.hash(password1, 10)
        //Creamos usuario y redirigimos exitosamente
            console.log("---------------Contraseñas coinciden, se procede a crear el usuario --------------- ");

            const secureUser = {user, email, location, edad, password:securePass};
            const newUser = new User(secureUser)
            
            newUser.save();
            resp.redirect("signin/login")
        } else {
        //Devolvemos error 
        resp.render("signin", {title: "Error", error: "Un error ha ocurrido, favor de revisar los datos"})
        }
}


/*
Esta funcion es la encargada de que cuando el usuario
envia el formulario y hace un post, el sistema verifica si existe una coincidencia de usuario y contraseña
encriptada y entonces devuelve el token 
*/
export const getLogin = async (req, resp) => {
    console.log("iniciando")
    let payload;

    //Extraemos los datos
    const {email, password} = req.body;
    
    //Buscamos al usuario que coincida con el email
    console.log("PASSWORDs DADA POR EL USER")
    
    const data = await User.findOne({email:email});
    console.log("---------------------------------------")
    console.log("PASSWORD DE USUARIO YA GUARDADO")
    console.log(data.password)

    if(data){
        //Si se encuentra usuario se compara la contraseña del user dado con el encriptado
        const isMatch = await bcrypt.compare(password, data.password);
        console.log(isMatch)

        if(isMatch){
            console.log("matchean")
            payload = {id: data.id}
            console.log("----------Generando TOken--------------")
            const token = await authenticate(payload);
            //devuelve el token al header
            resp.cookie('Authorization', token);
            resp.cookie('user', data.user, { maxAge: 3600000 });
            resp.redirect("/")

        } else {
            resp.json({
                error: true,
                message: "no se pudo encontrar el usuario"
            })
        }
    }
}