const express = require('express');
const router = express.Router();
const { Article } = require('../models/article');

// Add Route
router.get('/new',  async (req, res) => {
  res.render('add_article', {
    title: 'Add Article'
  });
});

// Get Single Article
router.get('/show/:id', async (req, res) => {
  try{
    const image = await Article.findById(req.params.id);
  
    res.render('article',{success:true, image: image})
  }catch (e) {
    res.send(e);
  }
   
});
router.get('/', async (req, res) => {
  //show all objects pagewise
  let currentPage = req.query.page || 1;
  const perpage = 9
  const articles = await Article.find().sort({'timestamp':1}).skip(perpage*(currentPage-1)).limit(perpage)
  
  res.render('index',{success:true, images: articles})
});

// Load Edit Form
router.get('/:id/edit', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    res.render('edit_article', {
      title: 'Edit Article',
      article: article
    });

  } catch (e) {
    res.send(e);
  }

});
//search
router.get('/search', async (req, res) => {
  try {
    search_param = req.query.q
    const article = await Article.find({ImgName: search_param});
    
    res.send({
      images: article
    });

  } catch (e) {
    res.send(e);
  }

});
// Add Submit POST Route
router.post('/', async (req, res) => {
  try {
    const {name, url, details} = req.body
    if(!name || !url || !details){
      res.send({success:false, error: "incomplete details"})
    }else {
      let article = await Article.create({
        ImgName: req.body.name,
        ImgURL : req.body.url,
        ImgDetails: req.body.details,
      });
      article.save();
      req.flash('success', 'Article Added');
      res.redirect('/');
    }
  } catch (e) {
    res.send(e);
  }

});



// Update Submit POST Route
router.post('/edit/:id', async (req, res) => {
  try {
    const article = {
      ImgName: req.body.name,
      ImgURL: req.body.url,
      ImgDetails: req.body.details
    };

    let query = { _id: req.params.id }

    const update = await Article.update(query, article);
    if (update) {
      req.flash('success', 'Article Updated');
      res.redirect('/');
    } return;

  } catch (e) {
    res.send(e);
  }

});
router.put('/:id/edit', async (req, res) => {
  try {
    const article = {
      ImgName: req.body.name,
      ImgURL: req.body.url,
      ImgDetails: req.body.details
    };

    let query = { _id: req.params.id }

    const update = await Article.update(query, article);
    if (update) {
      req.flash('success', 'Article Updated');
      res.redirect('/');
    } return;

  } catch (e) {
    res.send(e);
  }

});
// Delete Article
router.delete('/delete/:id', async (req, res) => {

  try {
    
    let query = { _id: req.params.id }
    const article = await Article.findById(req.params.id);

    
    remove = await Article.findByIdAndRemove(query);
    if (remove) {
      res.send('Success');
    }
   
  } catch (e) {
    res.send(e);
  }

});


module.exports = router;
