var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    product_id:{type:mongoose.Schema.Types.ObjectId, ref:"product_id"},
    product:{type : String, required : true},
    quantity:{type : Number, required : true},
    prices:{type: Number , required : true},
    date: Date
});
module.exports = mongoose.model('orders',orderSchema);