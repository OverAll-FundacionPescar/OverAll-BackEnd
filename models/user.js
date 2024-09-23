import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        minLength: 4,
        maxLength: 20,
        isRequired: true
    },
    email: String,
    edad: Number,
    especialidad: String,
    localidad: String,
    password:{
        type:String,
        minLength: 3,
        isRequired: true
    },
    trabajos:{
        //revision
    },
    profilefoto:{

    },
    contactos:{
        
    },
    descripcion: String,
    experiencia: String,

    
})


const User = mongoose.model("users", userSchema);
export default User;