import * as fs from "fs";
import {UploadRequest, UploadResponse} from '../interface/uploadInterface'

import { v2 as cloudinary } from "cloudinary";

export const cloudUpload = async (uploadRequest: UploadRequest): Promise<UploadResponse>  => {

  try {
    
    const folderName = process.env.NODE_ENV !== "production" ? "dev" : "prod";
    const cloudinaryUploadResult = await cloudinary.uploader.upload(
       uploadRequest.file.filePath,
      { folder: folderName, resource_type: "auto" },
      
    );
     console.log(cloudinaryUploadResult);

    if (!cloudinaryUploadResult.error) {
      const response: UploadResponse = {
        url: cloudinaryUploadResult.secure_url,
        key: cloudinaryUploadResult.public_id,
      };
      return response;
    } 
   //  console.log(cloudinaryUploadResult.error)
    throw new Error('Image Upload Fail');
  } catch (e) {
    // logger.error(e.message);
    console.log('cloudinary file upload error')
    console.log(e)
    throw new Error('Image Upload Fail');
  }

}