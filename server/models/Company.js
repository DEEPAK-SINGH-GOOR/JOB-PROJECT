const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  industry: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  hiringFor: { type: [String], required: true }, // Array of roles the company is hiring for
  logo: { type: String, required: false }, // Filename of the logo uploaded
});

module.exports = mongoose.model("Company", companySchema);
