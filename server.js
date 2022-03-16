require("dotenv").config();
const express = require("express");
const connectDB = require("./db/db");
// Routs
const productRoute = require("./routes/product");
const authRoute = require("./routes/auth");

const path = require("path");
const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");

// Error Checks
const { notFound, errorHandler } = require("./utils/errorMiddleware");

const app = express();

app.use(express.json());

// Upload
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(helmet());
app.use(morgan("common"));

// Function for uploading
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/images");
  },
  filename: (req, res, cb) => {
    cb(null, req.body.name);
  },
});

const uploads = multer({ storage: storage });

app.post("/api/upload", uploads.single("file"), (req, res) => {
  try {
    return res.status(200).json("file uploaded");
  } catch (error) {
    console.log(error);
  }
});

// routes
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server is up on ${PORT} port`));
  } catch (error) {
    console.log(error);
  }
};

start();
