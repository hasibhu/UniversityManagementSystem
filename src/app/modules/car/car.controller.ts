import { Request, Response } from "express";

import { carService } from "./car.service";




export const createCar = async (req: Request, res: Response) => {
    try {
        const carData = req.body;
        const result = await carService(carData);


         // send response
        res.status(200).json({
            success: true,
            message: 'Student has been created successfully.',
            data: result
        })

    } catch (error) {
        console.log(error);
    }
}