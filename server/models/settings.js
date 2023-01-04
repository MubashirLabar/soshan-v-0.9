const mongoose = require("mongoose");
const settingschema = new mongoose.Schema({
    coupincode : {
      type : String,
  },
  activecoupin : {
      type : Boolean
  },
  activestore : {
      type : Boolean
  }
});

module.exports = order = mongoose.model("settings", settingschema);
