const cloudinary = require('../../config/cloudinary');

const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, { folder: 'globetrotter' });
};

module.exports = { uploadImage };
