import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        minLength: 4,
        maxLength: 20,
        isRequired: true
    },
    apellido: {
        type: String,
        minLength: 4,
        maxLength: 20,
        isRequired: true
    },
    edad: Integer,
    especialidad: String,
    zona: {
        type:String
    },
    Pass:{
        type:String,
        minLength: 8,
        isRequired: true
    },
    imagenes:{
        //revision
    },
    contactos:{
        //Revision
    }
    
})


const User = mongoose.model("users", userSchema);