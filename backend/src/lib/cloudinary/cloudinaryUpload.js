const fs = require("fs");
const cloudinary = require('cloudinary').v2;

//technique which is used here
//first: we take the file from the user and store it in the local sever environment
//second: after that we store the file on the cloudinary service

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {

  try {
    if (!localFilePath) {
      console.log("you didn't pass the file");
      return;
    }

    //upload the file on the cloudinary service
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    })

    //file has been successfully uploaded
    // console.log("file has been uploaded on successfully", response.url)
    fs.unlinkSync(localFilePath) //remove the locally saved file temporary as the upload operation completed successfully!
    return response;

  } catch (error) {
    fs.unlinkSync(localFilePath) //remove the locally saved file temporary as the upload operation got failed!
    console.log('Error while uploading image on Cloudinary', error);
    return null;
  }

}

module.exports =  uploadOnCloudinary;

