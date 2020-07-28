const CsvDB = require("../models/csv");
//csv parser to convert csv to json or column arrays
const csvJson = require("csvtojson");
const fs = require("fs");
const path = require("path");

//to Upload any csv file into the system
module.exports.uploadFile = async function (req, res) {
  try {
    if (req.file) {
      let fileName = req.file.originalname;
      fileName = path.parse(fileName).name;
      console.log("name", fileName);
      console.log("path", req.file.filename);

      await CsvDB.create({
        name: fileName,
        path: req.file.filename,
      });
    }
    return res.render("home", {
      path: "home",
      title: "CSV Upload Home Page",
      message: "File successfully uploaded",
    });
  } catch (err) {
    return res.render("home", {
      path: "home",
      title: "CSV Upload Home Page",
      message: "File failed to upload",
    });
  }
};

//Display a list of all uploaded csv files
module.exports.listCSVFiles = async function (req, res) {
  try {
    let allFiles = await CsvDB.find({});
    return res.render("uploadedFiles", {
      title: "CSV Files",
      path: "files",
      files: allFiles,
    });
  } catch (err) {
    return res.redirect("back");
  }
};
