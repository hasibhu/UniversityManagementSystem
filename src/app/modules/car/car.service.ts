import { Car } from "./car.interface";
import carModel from "./car.model"





export const carService = async (carData: Car) => {

    
    // use of the customised statics 
    if (await carModel.isCarExists(carData.id)) {
        throw new Error('Car already exists');
    }
      // end  of the customised statics 
    
    const result = await carModel.create(carData);
    return result;
}