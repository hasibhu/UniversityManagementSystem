import { Car } from "./car.interface";
import carModel from "./car.model"





export const carService = async (carData: Car) => {

    const result = await carModel.create(carData);

    return result;
}