var models = require('../models/order');
var products = require('../models/product');

exports.orderProduct = function(req,res){
  
 var product_id = req.body.product_id
  var quantity = req.body.quantity

  products.findById(product_id, function(err , data){
      if(err) res.json({err:err, message:'couldnt get order'});
      if(Number.parseInt( data.quantity) >= Number.parseInt( quantity) ){
      data.quantity -= quantity;
      data.save();
      

      var order_details = {
          product:data.productname,
          prices : data.price * quantity,
          quantity:quantity,
          product_id:product_id,
          time:Date.now()   
      }
      models.create(order_details, function(err){
          if(err) res.json({err:err, message:'error ordering product'});
          res.json({message:'your order of '+ order_details.quantity + order_details.productname +' Products was successfully made'})

      })
     }else { res.json({message:'Sorry only '+ data.quantity + ' products are available now '});}
  })
}

exports.deleteOrder = function(req,res){
    var order_id = {_id: req.params.id}
    models.remove(order_id , function(err){
        if(err) res.json({err:err, message:'error deleting order'});
        res.json({message:'Order Deleted Successful'})
    })
}
exports.viewOrder = function (req, res){
    models.find({}, function(err , data){
        if(err) res.json({err:err, message:'error fetching order'});
        res.json({data});

    })
}


