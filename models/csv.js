// same instance of mongoose
const mongoose = require("mongoose");

//csv schema design
const csvSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//passing the productSchema instance to mongoose.model
const CSV = mongoose.model("CSV", csvSchema);

//exporting the schema to be used further
module.exports = CSV;
