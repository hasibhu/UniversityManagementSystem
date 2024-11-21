import { Model } from "mongoose";

// Define the Car type
export type Car = {
    id: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    origin: string;
    type: string;
    email: string;
};



// Define the model interface with static methods
export interface CarInterfaceModel extends Model<Car> {
    isCarExists(id: string): Promise<Car | null>;
}
