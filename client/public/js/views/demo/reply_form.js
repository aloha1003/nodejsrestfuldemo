define([
  'text!templates/demo/reply_form.html',
  'text!templates/demo/onereply.html',
  'text!templates/common/date.html',
  'text!templates/common/avatar.html',
  'models/reply'
], function(replyFormTemplate,onereplyTemplate,commonTemplateDir,avatarTemplate,replyModel){
 
  var Page = Backbone.View.extend({
    initialize: function(options )
    {
        options || (options = {});
        this.options = options;
    },
    el: '.reply_form',
    render: function () {
      console.log('reply_form');
      console.log(this.options);
          $(this.el).html(_.template(replyFormTemplate,{pid:this.options.pid}));
      },
      events:{
        'submit #reply_form' : 'reply_submit'
      },
      reply_submit: function(e){
        e.preventDefault();
        var data ={};
          data.pid = $("#pid").val();
          data.content = $('#content').val();
           var reply = new replyModel();
           reply.save(data,{
            success:function(model,res){
              console.log('sus');
              console.log(res);
               var template = _.template( onereplyTemplate, {reply:res,commonDir:commonTemplateDir,avatar:avatarTemplate});
             
              $('.rowtainer').append(template);

            },
            error:function(model,res){
              console.log('err');
              console.log(res);
            }
           });
           
         
      } 
    
  });
  return Page;
});
