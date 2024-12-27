import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { TUser, UserModel } from './user.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';


const userSchema = new Schema<TUser, UserModel>(  //
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      select:0 //will not retrieve user password in 
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});



// statics for checking  if user is available before statics
userSchema.statics.isUserExistByCustomId = async function (id: string) {
  // return await User.findOne({id}).select('password') //will provide only user id and hashed password
  return await User.findOne({id}).select('+password') // will provide all user info.
}


// Static method: Check if user is deleted
// Static method: Check if user is deleted or blocked by ID
userSchema.statics.isUserAccessibleById = async function (id: string) {
  const user = await this.findOne({ id });



  // Check if the user is deleted
  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "User is deleted already!!");
  }

  // Check if the user is blocked
  if (user?.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked!!");
  }

  return user; // Return user if accessible
};


userSchema.statics.isPasswordMatched = async function (plainTextPassword, hashedPassword) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)

}

userSchema.statics.isJWTIssuedBeforeChange = async function (passwordChangedTimeStamp, jwtIssuedTimeStamp) {

  // console.log(passwordChangedTimeStamp, jwtIssuedTimeStamp);

  const passwordChangedTime = new Date (passwordChangedTimeStamp).getTime()/100

  return passwordChangedTime>jwtIssuedTimeStamp
}


// before static 
// export const User = model<TUser>('User', userSchema);

// after static 
export const User = model<TUser, UserModel>('User', userSchema);
