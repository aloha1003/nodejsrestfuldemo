define([
  
], function() {
  Backbone.emulateHTTP = false;
  var User = Backbone.Model.extend({
      //urlRoot: server+'/session',
  	  defaults:{
              act: "" 
        },
      setAct:function(act){
      	console.log('act:'+act);
      	this.set('act',act);
      },
      url: function(options){   
  this.xhrFields = {
          withCredentials: true
        };
      		return server+'user/'+((this.get('id')!=undefined) ? this.get('id')+'/' :'') +this.get('act');
        //return server+'login';
        //return server+'session';
      },
      initialize: function () {
      var that = this;

     /* $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
        options.crossDomain ={
          crossDomain: true
        };
        options.xhrFields = {
          withCredentials: true
        };
      });*/
    }
  });
  return User;
});
