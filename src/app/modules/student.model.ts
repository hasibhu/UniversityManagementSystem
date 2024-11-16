import { Schema, model } from 'mongoose';
import { Guardian, Student, UserName, LocalGuardian } from './student/student.interface';
import validator from 'validator';

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
    id: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: userNameSchema,
        required:true
    },

    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    },

    dateOfBirth: {type: String},
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emmergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
        type: guardianSchema,
        required:true
    },

    bloodgroup: {
        type: String,
        enum: ["A+" ,"A-" , "B+" , "B-" , "O+" , "-O" , "AB+" , "AB-",],
        required: true
    },

    localGuardian: {
        type: localGuardianSchema,
        required:true
    },

    avatar: { type: String },
    
    profileImage: { type: String },
    
    isActive: {
        type: String,
        enum: ["active", "blocked"],
        default: "active"
    }
});
 


// model part starts here

const StudentModel = model<Student>("Student", studentSchema, );

export default StudentModel;








// {
// why data collection name is "students"? 
    

//     In Mongoose, when you create a model, the default behavior is to generate the collection name by pluralizing the model name. This behavior is due to Mongoose's internal naming conventions, which are designed to follow common MongoDB practices where collection names are typically pluralized forms of the model names.

// Default Behavior:
// Model Name: The name you provide to the model function (in this case, "Student").
// Pluralization: Mongoose uses a library called "pluralize" to convert the model name to its plural form. Therefore, "Student" becomes "students".
// Here’s the relevant part of your original code:
// const StudentModel = model<Student>("Student", studentSchema);

// Since you didn’t specify a collection name, Mongoose automatically pluralizes "Student" to "students" and uses it as the collection name.

// How Mongoose Determines Collection Name:
// Model Name: The first argument you pass to model is the name of the model.
// Schema: The second argument is the schema that defines the structure of the documents.
// Collection Name: If you don’t provide a third argument (the explicit collection name), Mongoose automatically pluralizes the model name and uses it as the collection name.
// Overriding the Default Collection Name:
// If you want to override this behavior and specify a different collection name, you need to provide the third argument to the model function, as shown in the updated example:

// const StudentModel = model<Student>("Student", studentSchema, "student2024");

// Summary:
// Default Collection Name: Mongoose pluralizes the model name to generate the collection name.
// Explicit Collection Name: You can override the default behavior by specifying the collection name as the third argument to the model function.
// This design choice in Mongoose helps adhere to common practices and makes it easier to manage collections in a consistent manner, but it also allows flexibility when needed by letting you specify custom collection names.







// }