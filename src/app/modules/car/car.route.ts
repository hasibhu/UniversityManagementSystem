import express from 'express'
import { createCar } from './car.controller';



const router = express.Router();


router.post('/createCar', createCar)


export const CarRoutes = router;