// const express = require("express");
// const router = express.Router();
// const { createCompany, upload, getCompanies } = require("../controllers/CompanyControllers");

// router.post("/postcompany", upload.single("logo"), createCompany);
// router.get("/getcompanies", getCompanies); // Fetch all companies

// module.exports = router;
const express = require("express");
const router = express.Router();
const { createCompany, upload, getCompanies, getCompanyById } = require("../controllers/CompanyControllers");

// Route to post a company (including logo upload)
router.post("/postcompany", upload.single("logo"), createCompany);

// Route to fetch all companies
router.get("/getcompanies", getCompanies);

// Route to fetch a single company by ID
router.get("/getcompany/:id", getCompanyById);

module.exports = router;
