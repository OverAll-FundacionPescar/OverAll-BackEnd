import User from "../models/user.js"
import jwt from "jsonwebtoken"


export const getFaq = async (req, res) => {
    const SECRETWORD = "overAllAguante";
    try{
    const search = req.cookies.token
    if(search){
        const {id} = jwt.verify(search, SECRETWORD);
        const resultados = await User.findById({_id:id})
        console.log(resultados)
    res.render("faq", {estilos:"faq_resources/styles/styles.css", user:resultados.user})
    }
    } catch(error) {console.log(error)}
    finally{
    res.render("faq", {estilos:"faq_resources/styles/styles.css"})
    }
}