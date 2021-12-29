var cloudinary = require('cloudinary').v2;
const { storageConfig } = require('../config/config')

cloudinary.config({
    cloud_name: `${storageConfig.cloudName}`,
    api_key: `${storageConfig.apiKey}`,
    api_secret: `${storageConfig.apiSecret}`,
    secure: true
});
const upload = (req) => {
    const file = cloudinary.uploader.upload(`${req.path}`).then((result) => { return result })
    return file
}

const erase = (req, res) => {
    const file = cloudinary.uploader.destroy(`${req}`).then((result) => { return result })
    return file
}

module.exports = { upload, erase }