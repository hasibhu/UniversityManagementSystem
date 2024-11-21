
import { Response, Request } from "express";
import { manService } from "./man.service";
import Joi from "joi";




export const createMan = async (req: Request, res: Response) => {
    

    try {

        // creating a schema for validating with Joi 

        const JoiValidtionSchema = Joi.object({
            id: Joi.string().required(),
            name: Joi.string().required().max(20),
            degree: Joi.string().required(),
            job: Joi.string(),
            location: Joi.string().required(),
            email: Joi.string().email().required()

        })

        const manData = req.body;

        const { error, value } = JoiValidtionSchema.validate(manData)

        // console.log(error, value);

        if (error) {
            // Return validation error to client
            return res.status(400).json({
                success: false,
                message: "Validation error",
                details: error.details.map((detail) => detail.message)
            });
        }

        const result = await manService(manData);


        // send response
        res.status(200).json({
            success: true,
            message: 'Man data has been created successfully.',
            data: result
        })
    } catch (error: any) {
        // Handle the error thrown by the service
        if (error.message === "User already exists.") {
            return res.status(409).json({
                success: false,
                message: error.message, // Send the specific error message to the client
            });
        }
    }
}