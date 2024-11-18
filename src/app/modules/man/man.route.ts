
import { createMan } from "./man.controller";
import express from 'express'


const router = express.Router();



router.post('/createMan', createMan)


export const ManRoutes = router;