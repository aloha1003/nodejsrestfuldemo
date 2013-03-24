define([
  'text!templates/demo/reply_list.html',
  'text!templates/common/date.html',
  'text!templates/common/avatar.html',
  'text!templates/demo/onereply.html',
  'collections/reply',
  
], function(  replyListTemplate,commonTemplateDir,avatarTemplate,onereplyTemplate,replyCollection){
 
  var Page = Backbone.View.extend({
    initialize: function(options )
    {
        options || (options = {});
        this.options = options;
    },
    el: '.reply_contaner',
    render: function () {
      console.log(this.options);
      var reply = new replyCollection({pid: this.options.pid});
      var that = this ;
        reply.fetch({
          success:function(col,res){     
            
            
             $(that.el).html(_.template(replyListTemplate,{onereplyTemplate:onereplyTemplate,avatar:avatarTemplate,count:res.count,list:res.list,commonDir:commonTemplateDir}));
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
