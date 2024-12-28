import { v2 as cloudinary } from 'cloudinary';
import config from '../config';



export const sendImageToCloudinary = () => {



    // Configuration
    cloudinary.config({ 
        cloud_name: config.cloud_name, 
        api_key: config.cloudinary_api_key, 
        api_secret: config.cloudinary_api_secret// Click 'View API Keys' above to copy your API secret
    });



    cloudinary.uploader.upload(
        'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
        {
               public_id: 'shoes',
        },
        function (error, result) {
            console.log(result);
        }
    
    
    
    )
       

}