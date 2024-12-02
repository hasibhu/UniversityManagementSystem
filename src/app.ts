
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { ManRoutes } from './app/modules/man/man.route';
import { CarRoutes } from './app/modules/car/car.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandle from './app/middleware/globalErrorHandler';
const app: Application = express();

app.use(express.json());
app.use(cors());


// application routes
app.use('/app/v1/students', StudentRoutes);
app.use('/app/v1/users', UserRoutes);

app.use('/app/v1/man', ManRoutes)
app.use('/app/v1/car', CarRoutes)



const getAController = (req: Request, res: Response) => {
  const a = 200;

  res.sendStatus(a);
}

app.get('/', getAController);



// error handler 

app.use(globalErrorHandle) // not call jsu use 




export default app;
