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
    edad: Number,
    especialidad: String,
    zona: {
        type:String
    },
    password:{
        type:String,
        minLength: 3,
        isRequired: true
    },
    imagenes:{
        //revision
    },
    contactos:{
        
    }
    
})


const User = mongoose.model("users", userSchema);
export default User;