const JWT = require("jsonwebtoken");
const Users = require("../model/user.schema");
const bcrypt = require("bcrypt");

const login = async(req,res)=>{
  try {
    const {email,password} = req.body;
    const user = await Users.findOne({email});

    if(!user){
      return res.status(401).json({message:"Invalid email or Password"});
    }
    
    const isMatched = await bcrypt.compare(password,user.password);

    if(!isMatched){
      return res.status(401).json({message:"Invalid email or Password"});
    }
    
    const token = JWT.sign({name:user.name,email:user.email,id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"7d"});
    res.status(200).json({message:"user logged in successfully",user,token});
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({message:"An unexpected error occurred during login."});
  }
}

const signup = async(req,res)=>{
  try {
    const {name,email,password,role} = req.body;

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User with this email already exists." });
    }

    const hashPass = await bcrypt.hash(password,10);

    const user = await Users.create({
      name,
      email,
      password:hashPass,
      role,
    })

    const token = JWT.sign({name:user.name,email:user.email,id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"7d"});
    res.status(201).json({message:"user created successfully",user,token});
  } catch (error) {
    // Log the actual error for debugging purposes
    console.error("Signup Error:", error);
    // Send a generic error message to the client
    res.status(500).json({message:"An unexpected error occurred during signup."})
  }
}
const logout = (req, res) => {
  // If you're using cookies, you can clear it here
  res.clearCookie("token"); // only if token was stored in cookie
  res.status(200).json({ message: "Logged out successfully" });
};
module.exports = {login,signup,logout}