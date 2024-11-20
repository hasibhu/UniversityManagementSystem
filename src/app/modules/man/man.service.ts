import { Man } from "./man.interface"
import manModel from "./man.model"


export const manService = async (manData: Man) => {
    // const result = await manModel.create(manData) // this is a built in static method

    // alternative

    const resultInstance = new manModel(manData)

    const result = await resultInstance.save(); //this is a built in instance method



    return result;
}