import mongoose from "mongoose";

const reseñaSchema = mongoose.Schema(
    {
        id_esp: String,
        reseñas: {
            redactor_id: String,
            puntaje : Number,
            comment: String
        }, 
        promedioReseña:Number
    }
)

const Reseña = mongoose.model("reseñas", reseñaSchema);
export default Reseña;