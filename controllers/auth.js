//Controlador para devolver vistas y manejar creacion de usuarios
import User from "../models/user.js";
import bcrypt from "bcrypt"
import { authenticate, verify } from "../utils/index.js";


//Renderiza registro
export const signinPage = async (req, resp) => {
    resp.render("signin", {estilos:"/signin_resources/styles_registro.css"});
}
export const loginForm = async (req, resp) => {
    resp.render("login", {estilos: "/login_resources/login.css"})
}



export const register = async (req, resp) => {
    //Extraemos los datos
    const {user, email, localidad, edad, password1, password2} = req.body
    const edadUser = new Date(edad);
    const hoy = new Date();
    const years = hoy.getFullYear() - edadUser.getFullYear(); 
    //Verificamos ambas pass
        if( password1 == password2){
            const securePass = await bcrypt.hash(password1, 10)
        //Creamos usuario y redirigimos exitosamente
            console.log("---------------Contraseñas coinciden, se procede a crear el usuario --------------- ");

            const secureUser = {user, email, localidad, edad:years, password:securePass};
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

    //Extraemos los datos
    console.log(req.body)
    const {email, password} = req.body;
    //Buscamos al usuario que coincida con el email
    const data = await User.findOne({email:email});
    console.log("---------------------------------------")
    console.log("PASSWORD DE USUARIO YA GUARDADO")
    

    if(data){
        //Si se encuentra usuario se compara la contraseña del user dado con el encriptado
        const isMatch = await bcrypt.compare(password, data.password);
        console.log(isMatch)

        if(isMatch){
            console.log("matchean")

            const payload = {id: data.id}

            console.log("----------Generando TOken--------------")
            console.log("")
            console.log("")
            console.log("")
            const token = await authenticate(payload);
            //devuelve el token al header
            console.log(token)
            
            resp.cookie("token",token)
            resp.redirect("/")
            
            console.log("----Se envia token en authorization---")
            console.log("")
            console.log("")
            console.log("")
            // resp.cookie('user_id', data._id, { maxAge: 3600000 });
            //

        } else {
            resp.json({
                error: true,
                message: "no se pudo encontrar el usuario"
            })
        }
    }
}

export const logout = async (req, resp) => {
    console.log("borrando token")
    resp.clearCookie('token')
    resp.redirect("/")
}