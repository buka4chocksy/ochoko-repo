var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    
    try{
    var token = req.headers.authorization.split(" ")[1];
     var decode = jwt.verify(token,"securitykey")
     req.userData = decode;
     next();
    } catch (error){
        return res.json({message:'token authentication failed !!'});

    }
   
}