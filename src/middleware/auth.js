const jwt = require('jsonwebtoken');

// Middleware to verify the JWT token
const auth  = async(req,res,next)=>{
   try{
      const token = req.header("Authorization").replace('Bearer ',"");
      
      if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing.' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user=decoded;
      next();
   }
   catch(err){
    console.log("error",err)
     res.status(401).json({ message: 'Authentication token is invalid. Pls try later prod' });
   }
}

module.exports=auth;