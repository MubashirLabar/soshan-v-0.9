const bcrypt = require("bcryptjs");
const User = require('../models/user');
const jwt = require('jsonwebtoken')

const signtoken = (id) => {
  // 60 * 60 = 3600 1h
  return jwt.sign(
    { id },
    process.env.jwttokensignatiure,
    // for message 10 minutes
    { expiresIn: "200d" }
  );
};

// exports.createuser = async (req, res) => {
    
//     let { username, password } = req.body;
//     password = await bcrypt.hash(password, 12);
//     await User.create({username,password})
//     try {
//         return res.status(200).json({
//           success: "true",
//         });
      
//     } catch (error) {
//       res.status(404).json({
//         errors: "Error while creating user",
//       });
//     }
//   };

  exports.loginuser = async (req, res) => {
    try {
      let { username, password } = req.body;
      console.log({ username, password })
      theuser = await User.findOne({ username });
      const result = await bcrypt.compare(
        password,
        theuser.password
      );
      if (!result) {
        return res.status(422).json({
          errors: "Username or password invalid",
        });
      }
      const thetoken = await signtoken(theuser._id);
      return res.status(200).json({
        success: "true",
        token: thetoken,
      });
    } catch (error) {
      res.status(404).json({
        errors: "Error while creating user",
      });
    }
  };

  exports.checkuser = async (req, res) => {
    try {
      return res.status(200).json({
        success: "true",
      });
    } catch (error) {
      res.status(404).json({
        errors: "Error while creating user",
      });
    }
  };

  exports.changepassword = async (req, res) => {
    let { password, cpassword } = req.body;
    if(password != cpassword)
    {
      res.status(404).json({
        errors: "Password field did'nt matched",
      });
    }
    theuser = await User.findOne({ username : 'admin' })
    password = await bcrypt.hash(password, 12);
    theuser.password = password;
    theuser.save()
    try {
      return res.status(200).json({
        success: "true",
      });
    } catch (error) {
      res.status(404).json({
        errors: "Error while creating user",
      });
    }
  };
  