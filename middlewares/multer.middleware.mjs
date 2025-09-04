import multer from "multer";
import path from "node:path"

const storage = multer.diskStorage({
    destination: function(request, file, cb){
        cb(null, 'uploads/temp')
    },
    filename: function(request, file, cb){
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage
})

export default upload