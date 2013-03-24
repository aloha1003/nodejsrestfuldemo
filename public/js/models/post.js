define([
  'backbone'
], function(Backbone) {
  Backbone.emulateHTTP = false;
  var Post = Backbone.Model.extend({
      id:null,
      idAttribute: "id",
  	  defaults:{
             title:'',
             content:'',
             ptype: '' 
        },
     
      url: function(){

      		return server+'post/'+((this.id!=null) ? this.id : '');
      },
      initialize: function(options)
      {
       
          options || (options = {});
          
      }
  });
  return Post;
});
