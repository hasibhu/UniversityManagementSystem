import { Schema, model } from "mongoose";
import { Car, CarInterfaceModel,  } from "./car.interface";



const carSchema = new Schema<Car, CarInterfaceModel>({
    id: {
        type: String,
        required: true,
        unique: true,
    },
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

});


// creating customized static method



carSchema.statics.isCarExists = async function (id: string) {
    console.log('Checking if car exists with ID:', id);
    const existingCar = await this.findOne({ id });
    return existingCar;
}

const carModel = model<Car, CarInterfaceModel>("Car", carSchema);




// const carModel = model<Car>("Car", carSchema);

export default carModel;