const mongoose = require("mongoose"),
  { Schema } = require("mongoose");
const messageSchema = new Schema({
  message: {
    type: String,
    required: true
  },                           
  userName: {
    type: String,
    required: true
  },                           
  user: {
    type: Schema.Types.ObjectId,
    required: true
  },
  // room: {
  //   type: String
  // }                          
}, { timestamps: true });      

module.exports = mongoose.model("Message", messageSchema);