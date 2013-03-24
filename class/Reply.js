var obj ={};
obj.insert = function(req,user,cb){
	var tmp = {};

 	tmp.content = req.body.content;
 	tmp.uid = user._id;
 	tmp.updatetime = Date.now();
 	//console.log(tmp);
 	console.log(req.body.pid);
 	
    redis_client.rpush('p_'+req.body.pid,JSON.stringify(tmp),function(err,count){
    	console.log(err);
    	console.log(count);
    	tmp.user = user;
    cb(tmp);
    });
    
};
module.exports = obj;