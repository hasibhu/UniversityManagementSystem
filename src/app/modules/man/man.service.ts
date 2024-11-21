import { Man } from "./man.interface"
import manModel from "./man.model"


export const manService = async (manData: Man) => {
    // this is a built in static method
    // const result = await manModel.create(manData)

    
    // alternative
    //this is a built in instance method
    const resultInstance = new manModel(manData) //create an instance
    // console.log('data from service', resultInstance);

    // application of the customised instance starts here 

    if (await resultInstance.isUserExists(manData.id)) {
        throw new Error('User already exists.')
    }
    //application of the customised instance ends here 

    

    const result = await resultInstance.save();

    return result;
};


