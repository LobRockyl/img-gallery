const mongoose = require('mongoose');

// Article Schema
const articleSchema = mongoose.Schema({
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
const Article = mongoose.model('Article', articleSchema);
module.exports.Article = Article;
