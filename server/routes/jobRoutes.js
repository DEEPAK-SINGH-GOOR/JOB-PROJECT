const express = require("express");
const multer = require("multer");  // Ensure multer is imported
const { createJob, getAllJobs } = require("../controllers/JobControlers"); // Adjust path if needed

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder to save uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Set a unique filename
  }
});

const upload = multer({ storage: storage });  // Create the upload middleware

const router = express.Router();

// Route to post a job
router.post("/postjob", upload.single("file"), createJob); // Make sure the file field in the form is named 'file'

// Route to get all jobs
router.get("/jobs", getAllJobs);

module.exports = router;
