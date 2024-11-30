
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { ManRoutes } from './app/modules/man/man.route';
import { CarRoutes } from './app/modules/car/car.route';
const app: Application = express();

app.use(express.json());
app.use(cors());


// application routes
app.use('/app/v1/students', StudentRoutes);

app.use('/app/v1/man', ManRoutes)


app.use('/app/v1/car', CarRoutes)



const getAController = (req: Request, res: Response) => {
  const a = 200;

  res.sendStatus(a);
}

app.get('/', getAController);




export default app;
