const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  employmentType: { type: String, required: true },
  experienceLevel: { type: String, required: true },
  skills: { type: String, required: true },
  salary: { type: String },
  location: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: String },
  file: { type: String }, // For the file uploaded with the job post
});

module.exports = mongoose.model("Job", JobSchema);
