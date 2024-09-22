import User from "../models/user.js";
import bcrypt from "bcrypt"
import { authenticate, verify } from "../utils/index.js";

export const getProfile = (req, res) => {
    res.render("profile", {estilos:"/profile_resources/styles_perfil.css"})
}