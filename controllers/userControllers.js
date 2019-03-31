var models = require('../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.createUser = function(req,res){
    var mail = {email: req.body.email}

    models.find(mail, function(err , data){
        if(data.length >=  1){
            res.json({message:'User Already Exists!!'});
      }else {

    bcrypt.hash( req.body.password , 10 ,(err,hash)=>{
        if(err) res.json({err:err, message:'error encountered during password creation'});
        var details = {
            email:req.body.email,
            password:hash
                      }
     models.create(details, function(err){
            if(err) res.json({err:err, message:'error signing up new user'})
            res.json({message:'NEw user Signup Successful'});
    
        })

    })
    
}

})

}

exports.loginUser = function(req,res){
    var mail = { 
        email:req.body.email,
        
       
    }
    models.find(mail , function(err, data){
        if(err) res.json({err:err, message:'unnecessary error encountered !!'})
        if(data.length >= 1){
            bcrypt.compare(req.body.password, data[0].password ,function(err,rest){
              
                if(rest){
                var token =  jwt.sign({
                        email:data[0].email,
                        user_id:data[0]._id
                    },
                    "securitykey", 
                    {
                        expiresIn:'1h'
                    }

                    )

                    res.json({message:'authentication successful!!', token:token});
                }else{
                    res.json({message:'authentication failed!!'});
                }
    

            })
            

        }else{
            res.json({message:'Sorry User does not exist!!'});
        }

    })

}