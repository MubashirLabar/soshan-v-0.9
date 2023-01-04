const mongoose = require("mongoose");
const orderschema = new mongoose.Schema({
  items : {
    type : Array
  },
  discount : {
    type : Number
  },
  price : {
    type : Number
  },
  address : {
    type : Object
  },
  status : {
    type : String,
    default : 'undone'
  },
  orderno : {
    type : Number
  }
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: true,
});

module.exports = order = mongoose.model("order", orderschema);
