var home ={};
var User = require('../class/User');
var Reply = require('../class/Reply');
home.index = home.list =function(req, res){
	var reply = [];
	var id = req.params.pid;

  redis_client.sort('p_'+id,'updatetime',function(){
      redis_client.lrange('p_'+id,0,-1,function(err,list){
     if(err) throw(err);
     //分析List，取得使用者
    
     if(list.length>0)
     {
     	list.forEach(function(l){
	      var t = JSON.parse(l);

	      User.getby_id(t.uid,function(user,i){
	        t.user = user;
	        t.updatetime = t.updatetime;
	         reply.push (t) ;
	         if(reply.length == (list.length))
	         {  //最後一筆
            var ret = {};
            ret.count = list.length;
            ret.list = reply;
	          	res.send(ret);
	         }
	      });  
	     });
     }
     else
     	res.send('{}');
     
  });
  });
}
home.insert = function(req,res){ //這裡用redis來試看看
   var user_id = req.cookies ?
      req.cookies.user_id : undefined;
   User.checklogin(req,res,function(err,user){
   	console.log(user);
   Reply.insert(req,user,function(reply){
      
       res.send(reply);
     });
   });   
}
module.exports = home;