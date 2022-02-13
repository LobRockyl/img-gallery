
const { Image } = require('../models/image');

async function getImageByID(id){
    try{
        const image = await Image.findById(id);
      
        return {success:true, image: image}
      }catch (e) {
        return {success:false, error: e}
      }
}

async function getObjectsPagewise(currentPage){
    const perpage = 9
    try{
        const articles = await Image.find().sort({'timestamp':1}).skip(perpage*(currentPage-1)).limit(perpage)
        const count = await Image.count()
        let num_pages = Math.ceil(count/perpage)
        console.log(num_pages)
        return {success:true, images: articles, pages: num_pages}
    }catch(e){
        return {success:false, error: e}
    }
    
}

async function search(search_param){
    try {
        
        const article = await Image.find({ImgName: search_param});
        
        return {
          images: article
        };
    
      } catch (e) {
        return {success:false, error: e}
      }
}

async function addImage(name,url,details){
    try {
        if(!name || !url || !details){
          res.send({success:false, error: "incomplete details"})
        }else {
          let article = await Image.create({
            ImgName: name,
            ImgURL : url,
            ImgDetails: details,
          });
          article.save();
          // req.flash('success', 'Article Added');
          // res.redirect('/');
          return {success:true, msg:"Article added", item: article._id}
        }
      } catch (e) {
        return {success:false, error: e}
      }
}

async function editImage(id,name,url,details){
    try {
        const article = {
          ImgName: name,
          ImgURL: url,
          ImgDetails: details
        };
    
        let query = { _id: id }
    
        const update = await Image.updateOne(query, article);
        if (update) {
          // req.flash('success', 'Article Updated');
          // res.redirect('/');
          return {success:true, msg:"Item Updated"}
        } return;
    
      } catch (e) {
        return {success:false, error: e}
      }
}

async function deleteImage(id){
    try {
    
        let query = { _id: id }

        remove = await Image.findByIdAndRemove(query);
        if (remove) {
          return {success:true, msg:"Item deleted"};
        }
       
      } catch (e) {
        return {success:false, error: e}
      }
}
module.exports = {getImageByID,getObjectsPagewise,search,addImage,editImage,deleteImage}