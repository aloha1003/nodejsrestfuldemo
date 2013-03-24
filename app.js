
/**
 * Module dependencies.
 */
if(true)
{ //  Configure

  var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , post = require('./routes/post')
  , http = require('http')
  , ejs = require('ejs')
  , path = require('path');
  ejs.open = '{{';
  ejs.close = '}}';
 var app = express.createServer();

  app.configure(function(){
    app.set('port', process.env.PORT || 80);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use( express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.register('html', ejs);
    app.use(express.static(path.join(__dirname, 'public')));
  });
  
   app.configure('development', function(){
    app.use(express.errorHandler());
  });
 
}

/*  Router  */
app.get('/', function(req,res){
  res.render('index.html');
});

app.listen(3003,function(){
  console.log('App listen on :'+3003);
});
