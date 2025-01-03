



// before static 
// export type TUser = {
//   id: string;
//   password: string;
//   needsPasswordChange: boolean;
//   role: 'admin' | 'student' | 'faculty';
//   status: 'in-progress' | 'blocked';
//   isDeleted: boolean;
// };

import { Model } from "mongoose";
import { USER_ROLE } from "./user.constants";




export interface TUser {
  id: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date,
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}



export interface UserModel extends Model<TUser>{
  isUserExistByCustomId(id: string): Promise<TUser>;
  isUserAccessibleById(id: string): Promise<TUser>;
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
  isJWTIssuedBeforeChange(passwordChangedTimeStamp: Date, jwtIssuedTimeStamp:number ): boolean
} 



export type TUserRole = keyof typeof USER_ROLE;