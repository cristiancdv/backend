const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(req);
        cb(null, './storage/image')
    },
    filename: function (req, file, cb) {

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${file.fieldname}-${uniqueSuffix}.jpg`)
    }
})


const upload = multer({ storage })


module.exports = upload