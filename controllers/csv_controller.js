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
      title: "My CSV Files",
      path: "files",
      files: allFiles,
    });
  } catch (err) {
    return res.redirect("back");
  }
};

//to display all the data in a table
module.exports.viewCSVFileData = async function (req, res) {
  try {
    let fileDoc = await CsvDB.findById(req.params.id);
    let csvFilePath = path.join(__dirname, "../", "uploads/", fileDoc.path);
    console.log(csvFilePath);
    const jsonArray = await csvJson().fromFile(csvFilePath);
    return res.render("display", {
      title: "Display CSV",
      path: "visualizer",
      name: fileDoc.name,
      jsonArray: jsonArray,
    });
  } catch (err) {
    //if error
    console.log(err);
    return res.redirect("back");
  }
};
