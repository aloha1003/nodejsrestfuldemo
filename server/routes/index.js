
/*
 * GET home page.
 */

var User = require('../class/User');


exports.index = function(req, res){
		var msg ={};
	    	 msg  =  'index.php/{control name}/{object id}';
	    	
	    	res.write( JSON.stringify(msg));
	    	res.end();

	

};

