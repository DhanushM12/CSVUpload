const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const csvController = require("../controllers/csv_controller");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../", "uploads/"));
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(
      null,
      file.fieldname +
        "-" +
        datetimestamp +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    //check if extension is not csv then error
    if (ext !== ".csv") {
      return callback(new Error("You can upload only CSV Files"));
    }
    callback(null, true);
  },
});

//route to Upload any csv file into the system
router.post("/upload", upload.single("csvfile"), csvController.uploadFile);
//route to Display a list of all uploaded csv files
router.get("/", csvController.listCSVFiles);
//route to display all the data (with column headers) in a table
router.get("/:id/view", csvController.viewCSVFileData);

module.exports = router;
