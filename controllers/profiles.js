import User from "../models/user.js";
import bcrypt from "bcrypt"
import { authenticate, verify } from "../utils/index.js";
import jwt from "jsonwebtoken"

const SECRETWORD = "overAllAguante";
export const getProfile =async (req, res) => {
    console.log("hola")
    verify(req, res)
    return res.render("profile", {estilos:"/profile_resources/styles_perfil.css"})}