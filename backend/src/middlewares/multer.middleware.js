const multer = require("multer");
const path = require("path");

// Define storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // console.log("Saving to:", path.join(__dirname, "..","..", "public", "temp"));

        // Adjust the path to point to the temp folder correctly
        // cb(null, path.join(__dirname, "..","..", "public", "temp")); // Move up one level to src and then to public/temp
        cb(null, path.join(__dirname, "../../public/temp")); // Move up one level to src and then to public/temp
    },
    filename: function (req, file, cb) {
        // Add timestamp to file name to avoid name clashes
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });


module.exports = upload;
