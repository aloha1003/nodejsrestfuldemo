
define([
  'view',
  'collections/user',
  'text!templates/demo/header.html'
], function( Vm, UserCollection, headerTemplate){
   
  var NowUserIsExist = Backbone.View.extend({
    el: '.header_container',
    render: function () {
      var that = this;
      var user = new UserCollection();
      user.fetch({
        success:function(col,ruser){
          console.log(ruser);
          $(that.el).html(_.template(headerTemplate, {user:ruser, _:_}));
        }
      });
    },
    events:{
      'click #post_add' : 'post_add'
    },
    'post_add'  :function(){
       require(['views/demo/post_add'],function(page){
        
            var post_add = Vm.create(this, 'post_add', page);
        
        post_add.render();
       });
    }

  });
  return NowUserIsExist;
});
