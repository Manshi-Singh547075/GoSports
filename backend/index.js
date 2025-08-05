const express = require("express");
require('dotenv').config()
const app = express();
const PORT = 4000;
const cors = require("cors")

app.use(cors({
  origin: ["http://localhost:5173", "https://688fa67a9c083eabe9af0a50--dainty-klepon-9275d5.netlify.app"],
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