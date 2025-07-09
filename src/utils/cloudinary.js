import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";


 cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_API_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    const uploadOnCloudinary = async (localFilePath) =>{
       try {
        if(!localFilePath) return null
      const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        console.log("file is upload on clodinar", response.url)
        console.log(response)

       } catch (error) {
         fs.unlinkSync(localFilePath)  // remove locally upload temperory file as the operation got failed
          
       }
    }

    export {uploadOnCloudinary}




    

    // const uploadResult = await cloudinary.uploader
    //    .upload(
    //        'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
    //            public_id: 'shoes',
    //        }
    //    )
    //    .catch((error) => {
    //        console.log(error);
    //    });