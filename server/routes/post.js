var User = require('../class/User');
var Post = require('../class/Post');
var home ={};
home.index = home.list =function(req, res){
  var user_id = req.cookies ? req.cookies.user_id : undefined;
  if(user_id!=undefined)
  {
     
      var page_size = 10;
      
      var page = req.query.page ?  parseInt(req.query.page) : 1;   
      db.collection('posts').find().
      count(function(err,count)
      {
        if(err) throw (err);
       
        if(count > 0)
        {
          db.collection('posts').find().
          skip((page-1)*page_size).
          limit(page_size).
          sort('updatetime').
          toArray(function(err,posts)
          {
              if(err) throw err;
              if(err) console.log(err);
              var ret = {};
              ret.count = count;
              ret.res = posts;
              res.send(ret);
            });
        }
        else
        {

          res.send({});
        }
      });
}
else
  res.send('{}}');
}

home.insert =function(req, res){
   var user_id = req.cookies ? req.cookies.user_id : undefined;
   User.checklogin(req,res,function(err,user){
    Post.insert(req,user,function(err,result){
        res.send(result);
       });
   });
}
home.delete = function(req,res){
    var _id = req.params.id;
   User.checklogin(req,res,function(err,user){
      db.collection('posts').
    findOne({_id: db.ObjectID.createFromHexString(_id)},function(err,post){
       if(err) throw(err);
      if(post!==null)
      { 
        if(post.user_id ==user._id )
        {
          Post.remove(_id,function(err,result){
            console.log(result);
            res.send('{}');
          })
        }
      }
    });
  }); 
}
home.update = function(req,res){
  
    var _id = req.params.id;
   User.checklogin(req,res,function(err,user){
      db.collection('posts').
    findOne({_id: db.ObjectID.createFromHexString(_id)},function(err,post){
       if(err) throw(err);
      if(post!==null)
      { 
        if(post.user_id ==user._id )
        {
          var set ={};
          set.title = req.body.title;
          set.content = req.body.content;
          Post.update(_id,set,function(err,result){
            res.send(result);
          });
        }
      }
    });
  }); 
}
home.detail = function (req,res){
  var _id = req.params.id;
  User.checklogin(req,res,function(err,user){

    try {
    _id = db.ObjectID.createFromHexString(_id);
   db.collection('posts').
    findOne({_id: _id},function(err,post){

      if(err) throw(err);
      if(post!==null)
      {
        //取得該篇文章的作者
        db.collection('users').findOne({_id: db.ObjectID.createFromHexString(post.user_id)},
          function(err,pu){

            post.user = pu;
            res.send(post);  
        });
      }
      else
      {
        res.send("{}");
      }
    });
} catch (err) {
  console.log(JSON.stringify({error: "Not found"}));
  //res.send('{xxx}');
}
   
  });
}


module.exports = home;