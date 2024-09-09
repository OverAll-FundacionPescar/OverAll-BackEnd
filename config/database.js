//Configuracion y conexion con la base de datos
import mongoose from "mongoose";
import dotenv from "dotenv";

//Configuracion de dotenv para archivos .env
dotenv.config()
//Desestructuracion de datos para conseguir DB_URI
const {DB_URI} = process.env;

//conexion con la base
function dbConnect(){
    mongoose.connect(DB_URI ?? "mongodb://localhost:27017/Overall")
    .then(() => {
        console.log("La conexion salio bien")
    })
    .catch((err) => {
        console.log("La conexion salio mal: " + err)
    })
}
//Exportamos para el uso
export default dbConnect;