const Job = require("../models/Job");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel"); // Assuming you have a user model

// Function to create a new job
const createJob = async (req, res) => {
  try {
    const { jobTitle, employmentType, experienceLevel, skills, salary, location, description, deadline } = req.body;

    const newJob = new Job({
      jobTitle,
      employmentType,
      experienceLevel,
      skills,
      salary,
      location,
      description,
      deadline,
      file: req.file ? req.file.path : undefined, // Save the file path if available
    });

    await newJob.save();

    // Send notification to all companies that have jobs posted
    const companies = await User.find({ role: "company" });
    companies.forEach(async (company) => {
      const notification = new Notification({
        userId: company._id,
        message: `A new job titled '${jobTitle}' has been posted.`,
        type: "company",
      });
      await notification.save();
    });

    res.status(200).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to post job" });
  }
};

// Function to get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

module.exports = { createJob, getAllJobs };
