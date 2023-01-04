const Settings = require('../models/settings')
exports.modifysettings = async (req, res) => {
    
    let {activecoupin, activestore, coupincode} = req.body;
    console.log(req.body)
    const settings = await Settings.find();
    console.log(settings)
    const id = settings[0]._id
    await Settings.findByIdAndUpdate(id,{activecoupin, activestore, coupincode })
    try {
        return res.status(200).json({
          success: "true",
        });
      
    } catch (error) {
      res.status(404).json({
        errors: "Error modifying settings",
      });
    }
  };

  exports.getsettings = async (req, res) => {
    const settings = await Settings.find()
    try {
        return res.status(200).json({
          success: "true",
          settings
        });
      
    } catch (error) {
      res.status(404).json({
        errors: "Error while creating user",
      });
    }
  };

  exports.getshopstatus = async (req, res) => {
    const storestatus = await Settings.find().select("activestore")
    try {
        return res.status(200).json({
          success: "true",
          storestatus
        });
      
    } catch (error) {
      res.status(404).json({
        errors: "Error while getting status",
      });
    }
  };