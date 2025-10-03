const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    let ext = file.fieldname + "-" + Date.now() + "." + file.mimetype.split('/')[1];
    cb(null, ext)
    console.log(ext);
  }
})
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    console.log("Supported format")
    cb(null, true);
  } else {
    console.log("unsupported format")
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  // limits: {
  //   fileSize: 1024 * 1024 * 5
  // }
});


module.exports = upload
