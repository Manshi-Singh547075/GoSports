const express = require("express");
require('dotenv').config()
const app = express();
const PORT = 4000;
const cors = require("cors")

const allowedOrigins = ["http://localhost:5173", "https://6891a7c70f9f99af3e75b067--dainty-klepon-9275d5.netlify.app/"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const connectDb = require("./db");

app.get("/", (req, res) => {
  res.status(200).json({message:"you have the Access"})
});

// routers
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const productRoutes = require("./routes/product.route");
const { isloggedIn } = require("./middleware");

app.use("/auth",authRoutes);
app.use("/user",isloggedIn,userRoutes);
app.use("/product",productRoutes);

app.listen(PORT, () => {
  connectDb()
  console.log("Server running on port " + PORT)
});