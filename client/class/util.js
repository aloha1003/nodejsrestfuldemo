var util ={};
util.setcookie = function(res,key,value){
	res.setHeader("Set-Cookie", [key+'='+value]	);
}
module.exports = util;