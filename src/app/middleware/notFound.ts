import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";



const notfound = (req: Request, res: Response, next: NextFunction) => {
    return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'API not fount',
        error: ''
    })
};

export default notfound;