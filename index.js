//Imports 
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { engine } from "express-handlebars";
import dbConnect from "./config/database.js";
import cookieParser from "cookie-parser";
import User from "./models/user.js";
import jwt from "jsonwebtoken"
//Router de usuarios
import usr from "./routers/users.js"
import aut from "./routers/auth.js"
import cors from "cors";
import faqr from "./routers/faq.js"
import profr from "./routers/profiles.js"
//Configuramos dotenv para reconocer archivos .env
dotenv.config()

//Variables
const app = express();
dbConnect()

//Variables para correr el servidor
const HOST = process.env.HOST || "localhost"
const PORT = process.env.PORT || 4301

//Config para express-handlebars
const config = {
    partialsDir: "./views/partials",
    layoutsDir: "./views/layouts",
    extname: "hbs",
    defaultLayout: "main" 
}

app.engine("hbs", engine(config))
app.set("view engine", "hbs")


//Especificamos usar morgan para desarrollo
app.use(morgan('dev'));



//Configuramos middleware json y urlencode
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(express.static("./public"))




const SECRETWORD = "overAllAguante";
//renderiza el main
app.get("/", async (req, resp) => {
    
    console.log("----------Pag de inicio----------")
    //Ejecutamos un try para qe intente recuperar el token y que si no lo tiene no se corte la ejecucion
    try{
    const search = req.cookies.token
    
    if(search){
        const {id} = jwt.verify(search, SECRETWORD);
        const resultados = await User.findById({_id:id})
    
    resp.render("index", {estilos:"/main_resources/styles/styles.css", user:resultados.user})
    }
    } catch(err) {console.log(err)}
    finally {
    resp.render("index", {estilos:"/main_resources/styles/styles.css"})
    }
}
)




//Routers
app.use("/user", usr)
app.use("/signin", aut)
app.use("/faq", faqr)
app.use("/profile", profr)
//Manejo de rutas

// app.use("/login",)
// app.use("/signin",)
// app.use("/profile",)
// app.use("/faq",)
// app.use("/busqueda",)
// app.use("/config",)

//Ponemos al servidor a escuchar en el puerto y host dado
app.listen(PORT, HOST, () => console.log(`Servidor corriendo en: ${HOST}:${PORT}`))