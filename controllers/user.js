import User from "../models/user.js"
import bcrypt from "bcrypt"
//Controlador de usuarios


//Crear usuario
export const createUser  = async (request, response) => {
    console.log("----Creando usuario!----")


    //Recibimos y hasheamos password
    const { pass } = request.body;

    //Hasheamos dando contraseña y veces a hashear, especificandole que espere
    const hashedPass = await bcrypt.hash(pass, 10)
    
    //Guardamos usuario
    //Especificando que use todos los datos del body pero que al password le asigne hashedPass
    const newUser = User({...request.body, password:hashedPass});

    newUser.save()
    .then((resultado) => response.json(resultado))
    .catch((error) => console.log("Ocurrio un error creando al usuario: " + error))




}

//Traer datos de usuario o usuarios
export function getUser(request, response){
    const {id} = request.params;
    //validacion de si hay o no id para buscar uno o muchos usuarios
    
    if(id){
        console.log("Solicitando usuarios: ")
        User.findById(id)
        .then((resultado) => {
            if(resultado){
                console.log("usuarios encontrados: " + resultado)
            } else {
                console.log("no se han encontrado usuarios")
            }
            response.json(resultado)
        })
        .catch((error) => console.log("Ha ocurrido un error buscando usuarios: " +error))
    } else {
        console.log("Solicitando usuario: " + request.params.id);
        User.find()
        .then((resultado) => {
            if(resultado){
                console.log("usuarios encontrados: " + resultado)
            } else {
                console.log("no se han encontrado usuarios")
            }
            response.json(resultado)
        })
        .catch((error) => console.log("Ha ocurrido un error buscando usuarios: " +error))
    }
    
}
//Actualizar datos de un usuario
export function updateUser(request, response){

}

//Borrar usuario
export function deleteUser(request, response){

}