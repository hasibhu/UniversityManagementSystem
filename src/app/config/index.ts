import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  dataBase_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BYCRYPT_SALT_ROUNDS,
  default_pass: process.env.DEFAULT_PASS,
  jwt_access_token: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_token: process.env.REFRESH_SECRET,
  jwt_accress_expiresIn: process.env.JWT_ACCESSS_EXPIRES_IN,
  jwt_refresh_expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  reset_password_url_link: process.env.RESET_PASSOWRD_URL_LINK,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloud_name: process.env.CLOUD_NAME,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET

};
