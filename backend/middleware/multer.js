import multer from "multer";

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"upload")        
    },
    filename: (req, file, cb) => {
        const fileExtension = file.originalname.split('.').pop();
        cb(null, file.fieldname + "-" + Date.now() + "." + fileExtension);
    }
});

const uploadpic = multer({ storage: Storage }).single("image")

export default uploadpic;