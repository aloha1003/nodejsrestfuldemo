var obj ={};
obj.checklogin = function(req,res,cb){
 	var user_id = req.cookies ? req.cookies.user_id : undefined;
 		 if(user_id !== undefined )
   {
  	
   		redis_client.get(user_id,function(err,user){
   		if(err) throw(err);
   		user = JSON.parse(user);

	      if(!user)
	      { 
	        db.collection('users').
		 	findOne({_id: db.ObjectID.createFromHexString(user_id)},
		 			function(err, user){
		 				if(err) throw (err);
		 				if(user)
		 				{
		 					user.avatar_render = obj.avatar_render;
		 					var str = JSON.stringify(user);
		 					
		 					redis_client.set(user._id,JSON.stringify(user),function(err,reply){
		 						if(err) throw err;	
		 						if(cb == undefined)
						   			return user;
						   		else
						   			cb(err,user) ;
		 					});
		 				}
		 			});
	      }
	      else
	      {
	      	user.avatar_render = obj.avatar_render;

	      	if(cb == undefined)
	   			return user;
	   		else
	   			cb(err,user) ;
	      }
   		});
   	}
   	else
   		cb(null,{});
 

  
};
obj.logining = function(req,res,cb){
	obj.exists(req.body.username,function(err,user){
		if(!err)
		{	//沒有錯誤的話
			if(user!=null)
			{
				var t = user;		
				 obj.writecookie(req,res,t,cb);
			}
			else
			{
				
				db.collection('users')
				.insert({
					 username    : req.body.username,
				     updated_at : Date.now()
				},function(err,user){
					if (err) throw err;

    				if (user) 
    				redis_client.set(user._id,JSON.stringify(user),function(err){
	 						if(err) throw err;		
 					cb(err,user) ;
	 				});
				});
			}
		}	
	});
}

obj.writecookie = function (req,res,doc,cb){
	res.cookie("user_id",doc._id,{domain:'localhost',path:'/',maxAge: 86400000});	
	redis_client.set(doc._id,JSON.stringify(doc),function(err,res){
				 	if(err) throw (err);			 	
				 	cb(null,doc);
				 });

};
obj.update = function(user,set,cb){
	 db.collection('users')
          .update( {_id: db.ObjectID.createFromHexString(user._id)},
                   {'$set':set},
                   function(err,result){
                  	if(err) throw err;
                      console.log(result);
                      //更新快取
                    obj.exists_nocache(user._id,function(err,user){
                      	redis_client.set(user._id,JSON.stringify(user),function(err,reply){
                      		
					 	if(err) throw (err);
					 	console.log(err);
					 	cb(null,user);
						 });
                      }); 
      			 });
}
obj.avatar_render = function (size,user) {
	var html = "";
		if(user.avatar !==undefined)
		{
		html += '<div  class="avatar avatar_'+size+'">';
		html += '<a href="/user/edit/'+user._id+'"><img src="'+user.avatar+'" alt="" ></a>';
		html += '</div>';
		}
		return html;
};
obj.exists_nocache = function(_id,cb){
	db.collection('users').
	 	findOne({_id: db.ObjectID.createFromHexString(_id)},
	 			function(err, user){

	 				if(err) return cb(err);
 					return cb(null,user);
	 			});
};
obj.getby_id = function(_id,cb)
{
	redis_client.get(_id,function(err,user){
		if(err) throw err;
		if(user)
		{
			user = JSON.parse(user);

			 cb(user);
		}
		else
		{	//建立新資料
			db.collection('users').
	 		findOne({_id: db.ObjectID.createFromHexString(_id)},
	 			function(err, user){
 					redis_client.set(user._id,JSON.stringify(user),function(err){
	 						if(err) throw err;		
	 				
 					cb(user) ;
	 			});
			});
			
	 	} 
	});
}
obj.exists = function(username,cb){
	db.collection('users').
	 	findOne({username: username},
	 			function(err, user){
	 				if(err) return cb(err);
 					return cb(null,user);
	 			});
 
};
module.exports = obj;
