import mongoose from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartmentModel } from "./academicDepartment.model";



// create department 
const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {

  // blocking double entry of any department after the unique validation in the validation schema 
  // const isDepartmentExist = await AcademicDepartmentModel.findOne({
  //   name: payload.name
  // })

  // if (isDepartmentExist) {
  //   throw new Error("The given department is already available in the database.")
  // }

  const result = await AcademicDepartmentModel.create(payload);
  return result;
};



// get all departments 
const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartmentModel.find().populate("academicFaculty"); //name of the schema property from model 
  return result;
};



// get single department
const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartmentModel.findById(id).populate("academicFaculty");
  return result;
};



// update department
const updateAcademicDepartmentIntoDB = async (id: string, payload: Partial<TAcademicDepartment>) => {
  const result = await AcademicDepartmentModel.findOneAndUpdate({ _id: id }, payload, {new: true});
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};