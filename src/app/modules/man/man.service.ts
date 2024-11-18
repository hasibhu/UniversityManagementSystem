import { Man } from "./man.interface"
import manModel from "./man.model"


export const manService = async (manData: Man) => {
    const result = await manModel.create(manData) 
    return result;
}