import User from "../models/user.js"
import bcrypt from "bcrypt"
//Controlador de usuarios


//Crear usuario
export const createUser  = async (request, response) => {
    console.log("----Creando usuario!----")


    //Recibimos y hasheamos password
    const { password } = request.body;
    
    //Hasheamos dando contraseña y veces a hashear, especificandole que espere
    const hashedPass = await bcrypt.hash(password, 10)
    console.log(hashedPass)
    //Guardamos usuario
    //Especificando que use todos los datos del body pero que al password le asigne hashedPass
    const newUser = User({...request.body, password:hashedPass});

    newUser.save()
    .then((resultado) => response.json(resultado))
    .catch((error) => console.log("Ocurrio un error creando al usuario: " + error))




}

//Traer datos de usuario o usuarios
export function getUser(request, response){
    console.log("Trayendo user")
    const {id} = request.params;
    //validacion de si hay o no id para buscar uno o muchos usuarios

    if(id){
        console.log("Solicitando usuario: + request.params._id")
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
        console.log("Solicitando usuarios: ");
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
export function updateUser({params:{id}, body}, response){
    //Se desestructura de los parametros del request el ID y el BODY

    //Se le da el ID como _id y se le setea el body
    User.updateOne({_id:id}, {$set:body})
    .then((resultado) => response.json({
        title:"Actualizacion de usuario: " ,
        status: "Exitosa!"
    }))
    .catch((error) => console.log("Error al actualizar: " + error))
    
}

//Borrar usuario
export function deleteUser({params:{id}}, response){
    //Mensaje para indicar el inicio de la funcion
    console.log(`Borrando usuario: ${id}` );

    
    User.deleteOne({_id:id})
    .then(() => response.json({
        title: "Borrando usuario",
        status: "Existosa!"
    }))
    .catch((err) => {
        console.log(`Error borrando usuario ${id}`);
        console.log(err);
        response.json({
            title: "Borrando usuario",
            status: "Error!"
        })
    })

}