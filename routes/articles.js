const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

// Get SingleImage
router.get('/show/:id', async (req, res) => {

  const reply = await userController.getImageByID(req.params.id)
  res.send(reply) 

});

//Show all objects pagewise
router.get('/', async (req, res) => {
  
  let currentPage = req.query.page || 1;
  const reply = await userController.getObjectsPagewise(currentPage)
  res.send(reply)

});

//Search
router.get('/search', async (req, res) => {

  search_param = req.query.q
  const reply = await userController.search(search_param)
  res.send(reply)

});

// Add Image POST Route
router.post('/', async (req, res) => {

  const {name, url, details} = req.body
  const reply = await userController.addImage(name,url,details)
  res.send(reply)

});

// Update Edit PUT Route
router.put('/:id/edit', async (req, res) => {

  const {name, url, details} = req.body
  const reply = await userController.editImage(req.params.id,name,url,details)
  res.send(reply)

});

// Delete Article
router.delete('/delete/:id', async (req, res) => {

  const reply = await userController.deleteImage(req.params.id)
  res.send(reply)

});


module.exports = router;
