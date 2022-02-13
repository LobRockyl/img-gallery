const mongoose = require('mongoose');

// Image Schema
const imageSchema = mongoose.Schema({
  ImgName: {
    type: String,
    required: true
  },
  ImgURL: {
    type: String,
    required: true
  },
  ImgDetails: {
    type: String,
    required: true
  },
  
},
{timestamps:true}
);
const Image = mongoose.model('Image', imageSchema);
module.exports.Image = Image;
