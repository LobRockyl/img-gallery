const userController = require('../controllers/userController')
const { Image } = require('../models/image');
const connectDB = require('../config/database');

const mongoose = require('mongoose');
//const {start} = require("../index")
const build = require('../build_app');

beforeAll( () => {
    console.log("Before all Tests")
    //await connectDB()
})

afterAll( (done) => {
	// Closing the DB connection allows Jest to exit successfully.
	mongoose.connection.close();
	done();
});

var ID=""
var test_image = {}
//unit test 1
test('Create image', async () => {

	let data = await userController.addImage("test_image","http://test_url","image for test")
    ID= data.item
	expect( data.success).toEqual(true);
    
});
//unit test 2

test('Read image', async () => {

	let data = await userController.getImageByID(ID)
    test_image = data.image;
	expect(data.success).toEqual(true);
    expect(data.image.ImgName).toEqual("test_image");
    expect(data.image.ImgURL).toEqual("http://test_url");
    expect(data.image.ImgDetails).toEqual("image for test");
});
// //unit test 3
test('Pagination', async () => {

	let page1data = await userController.getObjectsPagewise(1)
	expect(page1data.success).toEqual(true);
    expect(page1data.images.length).toBeGreaterThan(0);
   
});

// //unit test 4

test('Update image', async () => {

	let edited = await userController.editImage(ID,"edited test_image","http://editet_url","edited image for test")
    let edited_data = await userController.getImageByID(ID)
	expect(edited.success).toEqual(true);
    expect(edited_data.image.ImgName).toEqual("edited test_image");
    expect(edited_data.image.ImgURL).toEqual("http://editet_url");
    expect(edited_data.image.ImgDetails).toEqual("edited image for test");
	expect(edited_data.success).toEqual(true);
});
// //unit test 5

test('Delete image', async () => {

	let data = await userController.deleteImage(ID)
	expect(data.success).toEqual(true);
});


