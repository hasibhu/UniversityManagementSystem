import { ZodError } from "zod";
import { TErrorSource } from "../interface/error.interface";



   const handleZodError = (err: ZodError) => {
    const errorSources: TErrorSource = err.issues.map((issue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue?.message,
        }
    });

    const statusCode = 400;

    return {
      statusCode,
      message: 'Common validation error.',
      errorSources,
    };
   };
  

export default handleZodError;