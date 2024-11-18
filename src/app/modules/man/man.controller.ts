
import { Response, Request } from "express";
import { manService } from "./man.service";



export const createMan = async (req: Request, res: Response) => {
    

    try {
        const manData = req.body;
        const result = await manService(manData);


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