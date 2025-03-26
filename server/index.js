// // Backend: index.js
// const express = require("express");
// const cors = require("cors");
// const connectToDatabase = require("./config/db"); // Database connection
// const userRouter = require("./routes/userRouter"); // User routes (Login/Signup)
// const jobRouter = require("./routes/jobRoutes"); // Job routes (Job posting, fetching, etc.)
// const companyRouter = require("./routes/CompanyRoute"); // Company routes

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/uploads", express.static("uploads")); // Serve uploaded files

// // Connect to MongoDB
// connectToDatabase();

// // API Routes
// app.use("/api/user", userRouter); // Login & Signup Routes
// app.use("/api/job", jobRouter); // Job Posting Routes
// app.use("/api/company", companyRouter); // Company Routes

// // Default Route
// app.get("/", (req, res) => {
//   res.send("Welcome to the Job Portal API!");
// });

// // Start Server
// const PORT = 8090;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// Backend: index.js
const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./config/db"); // Database connection
const userRouter = require("./routes/userRouter"); // User routes (Login/Signup)
const jobRouter = require("./routes/jobRoutes"); // Job routes (Job posting, fetching, etc.)
const companyRouter = require("./routes/CompanyRoute"); // Company routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); // Serve uploaded files

// Connect to MongoDB
connectToDatabase();

// API Routes
app.use("/api/user", userRouter); // Login & Signup Routes
app.use("/api/job", jobRouter); // Job Posting Routes
app.use("/api/company", companyRouter); // Company Routes

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Job Portal API!");
});

// Start Server
const PORT = 8090;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
