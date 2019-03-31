var express = require('express');
var router = express.Router();
var productsControllers = require('../controllers/productControllers');
var multer = require('multer');
var product = require('../models/product');
var auth = require('../routes/check_auth');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null , './uploads')

    },
    filename: function(req,file, cb){
        cb(null ,file.originalname)

    }
})
//the limts aids in determining the limits of file size you can upload
var upload = multer({storage:storage , limits:{
    fileSize: 1024 * 1024 * 5

}});
var filter = function(req,file,cb){
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }

}

 
router.post('/create', auth,  upload.single('image') , function(req,res){
    console.log(req.file);
   
    var data ={
        productname:req.body.productname,
        price:req.body.price,
        quantity:req.body.quantity,
        image:req.file.path,
        time:Date.now()

    }
    product.create(data , function(err){
        if(err) res.json({err:err,message:'Error Adding Products'});
        res.json({message:'Product Added Successfully'});

    });


});
router.post('/delete',productsControllers.deleteProduct);
router.post('/update', productsControllers.updateProduct);
router.get('/',productsControllers.viewProducts);
router.get('/view/:id',productsControllers.viewproductByid);
module.exports = router;