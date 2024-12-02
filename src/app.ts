
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { ManRoutes } from './app/modules/man/man.route';
import { CarRoutes } from './app/modules/car/car.route';
import { UserRoutes } from './app/modules/user/user.route';
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

app.use((err: any, req: Request, res: Response, next: NextFunction) =>
{
  const statusCode = 5000;
  const message = 'Something went wrong';

  return res.status(statusCode).json({
    success: false,
    message,
    error: err
  })
})




export default app;
