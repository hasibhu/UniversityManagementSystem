import { Schema, model } from "mongoose";
import { Car } from "./car.interface";



 const carSchema = new Schema<Car>({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
     },
     email: {
         type: String,
         required: true
    }

})


const carModel = model<Car>("Car", carSchema);

export default carModel;