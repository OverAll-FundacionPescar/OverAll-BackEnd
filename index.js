//Imports 
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import dbConnect from "./config/database.js";
//Configuramos dotenv para reconocer archivos .env
dotenv.config()

//Variables
const app = express();
dbConnect()

//Variables para correr el servidor
const HOST = process.env.HOST || "localhost"
const PORT = process.env.PORT || 4301

//Especificamos usar morgan para desarrollo
app.use(morgan('dev'));

//Ponemos al servidor a escuchar en el puerto y host dado
app.listen(PORT, HOST, () => console.log(`Servidor corriendo en: ${HOST}:${PORT}`))

//Configuramos middleware json y urlencode
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static("./views/main"))



app.get("/", )

//Manejo de rutas
app.use("/", )
app.use("/login",)
app.use("/signin",)
app.use("/profile",)
app.use("/faq",)
app.use("/busqueda",)
app.use("/config",)
