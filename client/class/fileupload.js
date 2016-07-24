home = {};
var crypto = require('crypto');
var fs = require('fs');
var mkdir_p = require('../mkdir_p');
home.upload = function(req,res,cb){
 // if(req.files.length)

	var file = req.files.new_avatar;
  if(file.size >0)
  {
    var tmp_path = file.path;
   //有錯的

   /*var target_path =  automkname(file.name);
   fs.rename(tmp_path, target_path, function(err) {
            if (err)  console.log(err);
            // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
            fs.unlink(tmp_path, function() {
               //if (err) throw err;
               console.log('writing sus');
               cb(target_path);
            });
     });*/
   //結束
   automkname(file.name,function(target_path,return_path){
    console.log(file.name);
    console.log("TMP:"+tmp_path);
    console.log("Target:"+target_path);
       fs.rename(tmp_path, target_path, function(err) {
            if (err)  console.log(err);
            // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
            fs.unlink(tmp_path, function() {
               //if (err) throw err;
               console.log('writing sus');
               cb(return_path);
            });
     });
   }); 
  }
   else
    cb('');
      
}
  function automkname(filename,cb){
   //  var file = req.files.new_avatar;
   // var tmp_path = file.path;
     filename =  filename || '';

    var ext='';
    if(filename !='')
    {
      var i  = filename.lastIndexOf('.');
     ext = (i < 0) ? '' : filename.substr(i);
    }   
	 var newfilename = md5().substr(0,10); 
   //取得前四位
   var p1 = newfilename.substr(0,2),
      p2=newfilename.substr(2,2);
   //自動產生
 var path_pre = './public';
 var path_return = '/upload_images/'+p1+'/'+p2+'/'; 
var path = path_pre+path_return;
 var target_path = path+newfilename+ext;
 var target_path_return = path_return+newfilename+ext;  //前台呼叫用的網址
  mkdir_p.mkdir_p(path,0777,function(err){
   if(err !=undefined)
   {  
    console.log("Error:"+err);
    throw err;
    return false;
   }  
   else
   {
      if(cb !==undefined)
   return  cb(target_path,target_path_return);
 else
    return target_path;
   }
  });

 
}


 function md5() {
 	return crypto.createHash('md5').update(Math.random().toString()).digest('hex').substring(0, 24);
};
module.exports = home;