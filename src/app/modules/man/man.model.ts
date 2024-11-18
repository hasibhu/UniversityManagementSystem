import { Schema, model } from "mongoose";
import { Man } from "./man.interface";

const manSchema = new Schema<Man>({
    name: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    job: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },

})

const manModel = model<Man>("Man", manSchema)
export default manModel;