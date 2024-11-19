import { Schema, model } from "mongoose";
import { Man } from "./man.interface";

import validator from "validator";




const manSchema = new Schema<Man>({
    name: {
        type: String,
        trim: true,  //to remove unnecessary spaces
        required: true,
        validate: {             //cutomised validator
            validator: function (value: string) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
                return firstNameStr === value
            },
            message: "{VALUE} is not in capitalized format. "
        }
        
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
    email: {
        type: String,
        // required: true,
        // validate: {
        //     validator: (value: string) => validator.isEmail(value),
        //     message: "{VALUE} is not a valid email type "
                
        // }
    }

})

const manModel = model<Man>("Man", manSchema)
export default manModel;