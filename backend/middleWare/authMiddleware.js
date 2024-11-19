const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next)=>{
  const token = req.header('x-auth-token');

  if(!token){
    return res.status(400).json({message:"No token,authorization denied!"});
  }

  try{
    const decoded = jwt.verify(token,"sakshimashalkar");

    req.user = decoded;

    next();

  }catch(error){
    return res.status(400).json({message:"Token is not valid",error:error.message});
  }
}

module.exports = authMiddleware;