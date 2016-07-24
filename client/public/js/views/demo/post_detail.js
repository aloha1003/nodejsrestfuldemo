define([
  'view',
  'text!templates/demo/post_detail.html',
  'text!templates/common/avatar.html',
  'collections/post',
  'views/demo/reply_list',
  'views/demo/reply_form',


], function( Vm, postdetailTemplate,avatarTemplate,postCollection,replyView,replyFormView){
 
  var Page = Backbone.View.extend({
    initialize: function(options )
    {
        options || (options = {});
        this.options = options;
        
    },
    el: '.inner_container',
    render: function () {
      console.log(this.options);
      
      var post = new postCollection({_id: this.options._id});
      var that = this ;
        post.fetch({
          success:function(col,res){   
          console.log(res.length);  
         
            if( $.isEmptyObject(res))
               Backbone.history.navigate('#list',true);
              $(that.el).html(_.template(postdetailTemplate,{post:res,user:res.user,avatar:avatarTemplate}));
              var reply_option = {};
              reply_option.pid = (res._id.$id !=undefined ) ?  res._id.$id : res._id;
               var replyview =  Vm.create(this,'replyView', replyView,reply_option);
              replyview.render();
              var replyformview =  Vm.create(this,'replyFormView', replyFormView,reply_option);
              replyformview.render();
          },
          error:function(col,res){
            console.log('err'); 
            console.log(res);
          }
        });
      }
    
  });
  return Page;
});
