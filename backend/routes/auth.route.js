const express = require("express");
const { login,signup,logout } = require("../controller/auth.controller");
const router = express.Router();

router.post("/login",login);
router.post("/register",signup);
router.post("/logout", logout);



module.exports = router