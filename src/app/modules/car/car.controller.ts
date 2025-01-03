import { Request, Response } from "express";

import { carService } from "./car.service";
import { z } from "zod";




export const createCar = async (req: Request, res: Response) => {
    try {


        // creating vlidtion wiht Zod
        const carValidationSchema = z.object({
            id: z.string(),
            brand: z.string(),
            model: z.string(),
            year: z.number(),
            color: z.string(),
            origin: z.string(),
            type: z.string(),
            email: z.string().email("Invalid email").nonempty('Email is required.')
        })


        const carData = req.body;
        

        // before zod 
        // const result = await carService(carData);
        
        // with zod  
        const zodParsedData = carValidationSchema.parse(carData)
        const result = await carService(zodParsedData);



        // send response
        res.status(200).json({
            success: true,
            message: 'Car data has been created successfully.',
            data: result
        })

    } catch (error) {
    if (error instanceof z.ZodError) {
        // Handle validation errors
        return res.status(400).json({
            success: false,
            message: "Validation error.",
            details: error.errors.map((err) => ({
                path: err.path.join("."),
                message: err.message,
            })),
        });
    } else {
        // Handle other errors
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal server error',
        });
    }
}

}


// catch (error) {
        
//         if (error instanceof z.ZodError) {
//             // Handle validation errors
//             return res.status(400).json({
//                 success: false,
//                 message: "Validation error.",
//                 details: error.errors.map((err) => ({
//                     path: err.path.join("."),
//                     message: err.message,
//                 })),
//             });
//         }
//     }