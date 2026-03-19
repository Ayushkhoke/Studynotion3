// const express = require('express');
// const app = express();

// const userRoutes = require("./routes/user");
// const ProfileRoutes = require("./routes/Profile");
// const PaymentRoutes = require("./routes/Payment");
// const CourseRoutes = require("./routes/Course");

// const database = require("./config/database");
// const cookieParser = require("cookie-parser");
// const cors = require('cors');
// const { cloudinaryConnect } = require('./config/cloudinary');
// const fileupload = require("express-fileupload");
// const os = require('os');
// const dotenv = require('dotenv');

// dotenv.config();
// const PORT = process.env.PORT || 4000;

// //database connect
// database.connect();

// //middlewares
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//     fileupload({
//         useTempFiles: true,
//         tempFileDir: os.tmpdir(),
//     })
// );

// const allowedOrigins = ["http://localhost:3000", "http://localhost:3001","https://studynotion3-one.vercel.app"];
// app.use(
//     cors({
//         origin: allowedOrigins,
//         credentials: true,
//     })
// )

// //cloudinary connect
// cloudinaryConnect();

// // mount app
// app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/profile", ProfileRoutes);
// app.use("/api/v1/payment", PaymentRoutes);
// app.use("/api/v1/course", CourseRoutes);

// //default route
// app.get("/", (req, res) => {
//     return res.json({
//         success: true,
//         message: "your server is up and running",
//     })
// })

// app.listen(PORT, (err) => {
//     if (err) {
//         console.error(`error in the ${err.message}`);
//     }
//     else {
//         console.log(`app is running at ${PORT}`);
//     }
// })


// const express = require("express");
// const app = express();

// const userRoutes = require("./routes/user");
// const ProfileRoutes = require("./routes/Profile");
// const PaymentRoutes = require("./routes/Payment");
// const CourseRoutes = require("./routes/Course");

// const database = require("./config/database");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const { cloudinaryConnect } = require("./config/cloudinary");
// const fileupload = require("express-fileupload");
// const os = require("os");
// const dotenv = require("dotenv");

// dotenv.config();
// const PORT = process.env.PORT || 4000;

// /* ================= DATABASE ================= */
// database.connect();

// /* ================= CORS (MUST BE FIRST) ================= */
// const allowedOrigins = [
//   "http://localhost:3000",
//   "http://localhost:3001",
//   // "https://studynotion3-ylbj.vercel.app",
//   "https://studynotion3-eight.vercel.app"
  
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow requests with no origin (Postman, mobile apps)
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );


// app.options("*", cors());

// /* ================= MIDDLEWARE ================= */
// app.use(express.json());
// app.use(cookieParser());

// app.use(
//   fileupload({
//     useTempFiles: true,
//     tempFileDir: os.tmpdir(),
//   })
// );

// /* ================= CLOUDINARY ================= */
// cloudinaryConnect();

// /* ================= ROUTES ================= */
// app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/profile", ProfileRoutes);
// app.use("/api/v1/payment", PaymentRoutes);
// app.use("/api/v1/course", CourseRoutes);

// /* ================= DEFAULT ROUTE ================= */
// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "Server is up and running",
//   });
// });

// /* ================= START SERVER ================= */
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




// 🔥 VERY IMPORTANT — MUST BE FIRST
import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import userRoutes from "./routes/user.js";
import ProfileRoutes from "./routes/Profile.js";
import PaymentRoutes from "./routes/Payment.js";
import CourseRoutes from "./routes/Course.js";
import AIRoutes from "./routes/AI.js";

import database from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { cloudinaryConnect } from "./config/cloudinary.js";
import fileupload from "express-fileupload";
import os from "os";

const PORT = process.env.PORT || 4000;

database.connect();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://studynotion3-eight.vercel.app"
];

app.use(
  cors({
    origin: true, // Allow all origins for development
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(cookieParser());

app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: os.tmpdir(),
  })
);

/* ================= CLOUDINARY ================= */
cloudinaryConnect();

/* ================= ROUTES ================= */
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", ProfileRoutes);
app.use("/api/v1/payment", PaymentRoutes);
app.use("/api/v1/course", CourseRoutes);
app.use("/api/v1/ai", AIRoutes);

/* ================= DEFAULT ROUTE ================= */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is up and running",
  });
});

/* ================= START SERVER ================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});