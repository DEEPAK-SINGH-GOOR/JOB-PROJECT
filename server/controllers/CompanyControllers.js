// const Company = require("../models/Company");
// const multer = require("multer");

// // Configure Multer for file uploads
// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// // Create a new company
// const createCompany = async (req, res) => {
//   try {
//     const { name, industry, location, description, hiringFor } = req.body;
//     const logo = req.file ? req.file.filename : "";

//     const newCompany = new Company({
//       name,
//       industry,
//       location,
//       description,
//       hiringFor: hiringFor.split(", "), // Ensure it's stored as an array
//       logo,
//     });

//     await newCompany.save();
//     res.status(201).json({ message: "Company posted successfully!", company: newCompany });
//   } catch (error) {
//     console.error("Error posting company:", error);
//     res.status(500).json({ message: "Error posting company" });
//   }
// };

// // Fetch all companies
// const getCompanies = async (req, res) => {
//   try {
//     const companies = await Company.find();
//     res.status(200).json(companies);
//   } catch (error) {
//     console.error("Error fetching companies:", error);
//     res.status(500).json({ message: "Error fetching companies" });
//   }
// };

// module.exports = { createCompany, getCompanies, upload };
const Company = require("../models/Company");
const multer = require("multer");

const Notification = require("../models/notificationModel");

// Configure Multer for file uploads (logo upload for the company)
const storage = multer.diskStorage({
  destination: "uploads/",  // Directory for storing uploaded files
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);  // Use timestamp to ensure unique file names
  },
});

const upload = multer({ storage });  // Create the upload middleware

// Create a new company
const createCompany = async (req, res) => {
  try {
    const { name, industry, location, description, hiringFor } = req.body;
    const logo = req.file ? req.file.filename : "";  // Save the file name of the uploaded logo

    const newCompany = new Company({
      name,
      industry,
      location,
      description,
      hiringFor: hiringFor.split(", "), // Ensure hiringFor is an array of roles
      logo,  // Store the filename of the uploaded logo
    });

    await newCompany.save();
    res.status(201).json({ message: "Company posted successfully!", company: newCompany });
  } catch (error) {
    console.error("Error posting company:", error);
    res.status(500).json({ message: "Error posting company" });
  }
};

// Fetch all companies
const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);  // Return all companies
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ message: "Error fetching companies" });
  }
};

// Fetch a single company by ID
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);  // Find company by ID
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(company);  // Return the company if found
  } catch (error) {
    console.error("Error fetching company:", error);
    res.status(500).json({ message: "Error fetching company details" });
  }
};
// CompanyControllers.js

// Fetch notifications for a company
const getCompanyNotifications = async (req, res) => {
  try {
    // Assuming you have a companyId to fetch the notifications (adjust this as needed)
    const companyId = req.user.companyId;  // Assuming the companyId is set in the user object from authentication

    const notifications = await Notification.find({ companyId })
      .sort({ createdAt: -1 }) // Sort notifications by the latest first
      .exec();

    if (!notifications) {
      return res.status(404).json({ message: "No notifications found." });
    }

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching company notifications:", error);
    res.status(500).json({ message: "Error fetching notifications." });
  }
};


module.exports = { createCompany, getCompanies, getCompanyById, upload ,getCompanyNotifications };
