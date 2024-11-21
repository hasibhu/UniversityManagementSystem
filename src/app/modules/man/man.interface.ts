import { Model } from "mongoose";



export type Man = {
    id: string,
    name: string;
    degree: string;
    job: string;
    location: string,
    email: string
};





// export default Man

export type manMethods = {  //studentMethods
    isUserExists(id: string): Promise<Man | null>
};

export type manModelInInterface = Model<Man, Record<string, never>, manMethods>