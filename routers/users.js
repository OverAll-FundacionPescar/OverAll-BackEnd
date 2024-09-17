import { Router } from "express"
import * as us from "../controllers/user.js"
//Configuracion de Router de Usuarios CRUD
const userRouter = Router();


//Crear
userRouter.post("/", us.createUser);
//Traer unico usuario
userRouter.get("/:id", us.getUser);
//Traer todos
userRouter.get("/", us.getUser);
//Modificar/Actualizar usuario
userRouter.put("/:id", us.updateUser);
//Borrar usuario
userRouter.delete("/:id", us.deleteUser);

export default userRouter;