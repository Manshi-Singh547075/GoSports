const JWT = require("jsonwebtoken");

const isloggedIn = async (req,res,next)=>{
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Authentication token is missing or malformed." });
    }
    const token = header.split(" ")[1];

    const verified = JWT.verify(token,process.env.JWT_SECRET);

    req.user = verified;

    next();
  } catch (error) {
    // Catches invalid/expired tokens
    res.status(401).json({message:"User not authenticated."})
  }
}

const isAdmin = async (req,res,next)=>{
  try {
    const role = req.user.role;
    if(role != "admin"){
      return res.status(403).json({message:"Access denied. User is not an admin."});
    }
    next();
  } catch (error) {
    console.error("Admin Check Error:", error);
    res.status(500).json({message:"An unexpected error occurred."})
  }
}
module.exports = {isloggedIn,isAdmin}