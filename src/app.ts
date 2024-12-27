
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { ManRoutes } from './app/modules/man/man.route';
import { CarRoutes } from './app/modules/car/car.route';

import globalErrorHandle from './app/middleware/globalErrorHandler';
import notfound from './app/middleware/notFound';
import router from './app/routes';




const app: Application = express();

app.use(express.json());

app.use(cookieParser()) //just install, import and use it only here.

app.use(cors({origin:['http://localhost:8000/']}));


// application routes
app.use('/app/v1/', router)




app.use('/app/v1/man', ManRoutes)
app.use('/app/v1/car', CarRoutes)



const getAController = (req: Request, res: Response) => {
  const a = 200;

  res.sendStatus(a);
}

app.get('/', getAController);



// error handler 

app.use(globalErrorHandle) // not call, just use 


//not route found error handler

app.use(notfound)



export default app;
