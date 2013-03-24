define([
  'backbone'
], function(Backbone) {
  //Backbone.emulateHTTP = true;
  var Reply = Backbone.Model.extend({
  	  id:null,
      
      
      url: function(){
        console.log(this.id);
        var query ='';

      		return server+'reply/'+((this.get('id')!=null) ? this.get('id'): '');
      },
      initialize: function(options)
      {
          console.log(options);
          options || (options = {});
         
        
      }
  });
  return Reply;
});
