//Controlador para devolver vistas y manejar creacion de usuarios
import User from "../models/user.js";



//Renderiza registro
export const signinPage = (req, resp) => {
    resp.render("signin", {estilos:"/signin_resources/styles_registro.css"});
}


export const register = async (req, resp) => {


    //Extraemos los datos
    const {user, email, location, edad, password1, password2} = req.body
    
    //Verificamos ambas pass
        if( password1 == password2){
        //Creamos usuario y redirigimos exitosamente
            console.log("Contraseñas coinciden, se procede: ");
            const secureUser = {user, email, location, edad, password:password1};
            const newUser = new User(secureUser)
            newUser.save();
            resp.redirect("signin/login")
        } else {
        //Devolvemos error 
        resp.render("signin", {title: "Error", error: "Un error ha ocurrido, favor de revisar los datos"})
        }
}

export const getLogin = async (req, resp) => {
    resp.render("login", {estilos: "/login_resources/login.css"})
}