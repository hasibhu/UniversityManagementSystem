import { Schema, model, connect } from 'mongoose';
import { Guardian, Student, UserName, LocalGuardian } from './student/student.interface';


const userNameSchema = new Schema<UserName>(
    {
        firstName: { type: String, required: true },
        middleName: { type: String},
        lastName: { type: String, required: true },
})

const guardianSchema = new Schema<Guardian>({ 
        fatherName: { type: String, required: true },
        fatherOccupation: { type: String, required: true },
        fatherContactNo: { type: String, required: true },
        motherName: { type: String, required: true },
        motherOccupation: { type: String, required: true },
        motherContactNo: { type: String, required: true },
})


const localGuardianSchema = new Schema<LocalGuardian>({
        name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true }
})


const studentSchema = new Schema<Student>({
    id: { type: String },
    name: userNameSchema,
    gender: ["male", "female"],
    dateOfBirth: {type: String},
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emmergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: guardianSchema,
    bloodgroup: ["A+" ,"A-" , "B+" , "B-" , "O+" , "-O" , "AB+" , "AB-",],
    localGuardian: localGuardianSchema,
    avatar: {type:String},
    profileImage: {type:String},
    isActive: ["active", "blocked"]
});




// model part starts here

const StudentModel = model<Student>("Student", studentSchema);
export default StudentModel;