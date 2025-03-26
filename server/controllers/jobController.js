// controllers/jobController.js

const Job = require('../models/Job');
const User = require('../models/userModel');
const Notification = require('../models/notificationModel');

const applyForJob = async (req, res) => {
  const { jobId, employeeId } = req.body;

  try {
    const job = await Job.findById(jobId);
    const employee = await User.findById(employeeId);

    // Check if the employee has already applied
    if (job.applicants.includes(employeeId)) {
      return res.status(400).json({ message: "You already applied for this job" });
    }

    // Add employee to the applicants list
    job.applicants.push(employeeId);
    await job.save();

    // Create notifications
    // For the employee
    const employeeNotification = new Notification({
      userId: employeeId,
      message: `You have successfully applied for the job: ${job.title}`,
      type: 'employee',
    });
    await employeeNotification.save();

    // For the company
    const companyNotification = new Notification({
      userId: job.companyId,
      message: `${employee.name} has applied for the job: ${job.title}`,
      type: 'company',
    });
    await companyNotification.save();

    res.json({ message: "Job application successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { applyForJob };
