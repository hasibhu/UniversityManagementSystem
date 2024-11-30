import { Schema, model } from "mongoose";
import { Man, manMethods, manModelInInterface } from "./man.interface";

import validator from "validator";



// before instance 
// const manSchema = new Schema<Man>({
    
    // applying instance 
const manSchema = new Schema<Man, manModelInInterface, manMethods>({
    id: {
        type: String,
        required: true,
        unique: true
    },
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


manSchema.methods.isUserExists = async function(id: string) {
    const existingMan = await manModel.findOne({ id })
    
    return existingMan;
}

// The Resolution: Referencing this
// To avoid potential issues, you can rewrite the method to use this.constructor, which refers to the model tied to the schema:

// manSchema.methods.isUserExists = async function (id: string) {
//     const existingMan = await this.constructor.findOne({ id }); // Use `this.constructor`
//     return existingMan;
// };


const manModel = model<Man, manModelInInterface>("Man", manSchema)  /// this has been written as Student in the lecture 
export default manModel;