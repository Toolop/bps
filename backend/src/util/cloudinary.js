const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");

const uploadImage = (folderName, image) =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folderName,
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(image).pipe(uploadStream);
  });

const deleteImage = async (id) => {
  const pathNames = id.split("/");
  const publicId = `${pathNames[pathNames.length - 2]}/${
    pathNames[pathNames.length - 1]
  }`.split(".")[0];
  console.log(publicId);
  cloudinary.uploader.destroy(publicId);
};

module.exports = { uploadImage, deleteImage };
