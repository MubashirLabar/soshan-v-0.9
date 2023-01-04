const jwt = require('jsonwebtoken')
module.exports = (req,res,next) => {
   let token = req.header('tokenJWT77');
   console.log(token)
  if(!token){
      //
     return res.status(422).json({
        errors: "No token, authorization denied"
      });
  }
  try {
      const decoded= jwt.verify(token,process.env.jwttokensignatiure);
      req.user= decoded
      next()
  } catch (error) {
   //console.log(error)
   return res.status(422).json({
    errors: "Token is not valid,Please Retry"
  });
  }
}