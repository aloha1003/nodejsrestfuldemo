var home ={};

var fu = require('../class/fileupload');
var User = require('../class/User');


home.index = function(req,res){

   User.checklogin(req,res,function(err,user){
      if(err) throw (err);
       
        res.send(user);
      
   });
};
home.login =function(req,res){
 User.logining(req,res,function(err,doc){
     if(err) res.send("Error:"+err);
     
    res.send(doc);
   // res.end();
  });

};
home.logout = function(req,res){
  res.clearCookie("user_id",{domain:'localhost',path:'/',maxAge: 0});
 
  res.send('{}');
};
home.update = function (req,res){
   User.checklogin(req,res,function(err,user){
      fu.upload(req,res,function(img_url){  
        var obj = {};
        if(img_url != '')
          obj.avatar = img_url;
          obj.sign_text = req.body.sign_text;
         // obj.updatetime = Date.now();
        User.update(user,obj,function(err,result){
          if(err) throw (err); console.log(err);
          res.redirect('/');
        });
    });
   });  
}
home.edit = function (req,res){
  var user_id = User.checklogin(req,res,function(err,user){
    if(err) throw (err);

      res.render('user_edit.html', { title: __conf.webtitle,user:user,obj:User });
  });
   
}

module.exports = home;