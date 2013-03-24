var express = require('express');

var connect = require('connect');
// Custom csrf library
//var csrf = require('./csrf');
require( './db' );
 redis = require('redis'), redis_client = redis.createClient();
var routes = require( './routes' ),
    post = require('./routes/post'),
    user = require('./routes/user');
    reply = require('./routes/reply');
var server = express.createServer();

var allowCrossDomain = function(req, res, next) {
  // Added other domains you want the server to give access to
  // WARNING - Be careful with what origins you give access to
  var allowedHost = [
    'http://localhost:3003'
  ];
    res.header('Access-Control-Allow-Credentials', true);
    res.header('withCredentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    next();
}

server.configure(function() {
    server.use(express.cookieParser());
    server.use(express.session({ secret: 'alohalin' }));
    server.use(express.bodyParser());
    server.use(express.session({cookie: { path: '/', httpOnly: true, maxAge: null}, secret:'eeuqram'}));
    server.use(allowCrossDomain);
});
server.get( '/',function(req,res){
  res.send('{}');
} );
server.get( '/user/:id', user.index );
server.get( '/user', user.index );
server.delete( '/user/:id', user.logout );
server.delete( '/user', user.logout );
server.post( '/user/login',user.login);
server.get('/post',post.list);
server.get('/post/:id', post.detail);
server.post('/post', post.insert);
server.put('/post/:id', post.update);
server.delete('/post/:id', post.delete);
server.get('/reply/:pid',reply.list);
server.post('/reply',reply.insert);
server.listen(3000,function(){
  console.log('Server listen on :'+3000);
});