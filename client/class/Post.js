var obj ={};

obj.insert = function(req,user,cb){
	db.collection('posts')
				.insert({
					user_id : user._id,
			        ptype : req.body.ptype,
			        title: req.body.title, 
			        content : req.body.content,
			        updated_at:  Date.now()
				},function(err,res){
					if (err) throw err;	
 						cb(err,res) ;
	 				});				
};
obj.get = function(id,cb){
	db.collection('posts').
		findOne({_id: db.ObjectID.createFromHexString(id )},
		function(err,post){
			if (err) throw err;	
 			cb(err,post) ;
		}
		);
};
obj.update = function(id,set,cb){
	db.collection('posts')
          .update( {_id: db.ObjectID.createFromHexString(id )},
                   {'$set':set},
                   function(err,result){
                  	if(err) throw err;
                      
					 	cb(null,result);
                      }); 
      			
};
obj.remove = function(id,cb){
db.collection('posts').remove({_id: db.ObjectID.createFromHexString(id )}, function(err, result) {
   	if (err) throw err;	
 		cb(err,result) ;
 	});
};
module.exports = obj;