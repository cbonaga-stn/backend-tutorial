const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const MIME_TYPE_MAP = {   // Supported MIME types
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};

const fileUpload = multer({
  limits: { fileSize: 5000000 },  // File size limit: 5 MB
  storage: multer.diskStorage({      // Disk storage configuration
    destination: (req, file, cb) => {
      cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {    // Unique filename generation
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuidv4() + '.' + ext);
    }
  }),
  fileFilter: (req, file, cb) => {   // File type validation
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    cb(isValid ? null : new Error('Invalid mime type!'), isValid);  // Accept or reject file
  }
});

module.exports = fileUpload;