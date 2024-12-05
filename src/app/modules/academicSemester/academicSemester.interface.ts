

export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAcademicSemesterName= "Autumn" | "Summer" | "Fall";
export type TAcademicSemesterCode =  "01" | "02" | "03";

export type TAcademicSemester = {
    name: TAcademicSemesterName;
    year: string;
    code: TAcademicSemesterCode;
    startMonth: TMonths;
    endMonth: TMonths
}


 export type TAcademisSemesterAndCodeMapper = {
        [key: string]: string
    }