//Imports 
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { engine } from "express-handlebars";
import dbConnect from "./config/database.js";

//Router de usuarios
import usr from "./routers/users.js"
import aut from "./routers/auth.js"

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
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static("./public"))





//renderiza el main
app.get("/", (req, resp) =>{
    resp.render("index", {estilos:"/main_resources/styles/styles.css"})
    }
)

//renderiza el form de registro


//Routers
app.use("/user", usr)
app.use("/signin", aut)
//Manejo de rutas

// app.use("/login",)
// app.use("/signin",)
// app.use("/profile",)
// app.use("/faq",)
// app.use("/busqueda",)
// app.use("/config",)

//Ponemos al servidor a escuchar en el puerto y host dado
app.listen(PORT, HOST, () => console.log(`Servidor corriendo en: ${HOST}:${PORT}`))