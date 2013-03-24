define([
  'view',
  'text!templates/demo/template.html',
  'views/demo/header',
  'views/demo/servernotok',
  'collections/serverok',
  'collections/user',
  'views/demo/index',
  'views/demo/post_add'
], function( Vm, indexTemplate,HeaderView,ServerNotOkView,ServerOkCollection,UserCollection,IndexView,PostAddView){
 
  var DashboardPage = Backbone.View.extend({

    el: '.page',
    render: function () {
      $(this.el).html(indexTemplate);
      var serverok = new ServerOkCollection();
        serverok.fetch({
          success:function(res){
           
              var post_add = Vm.create(this, 'post_add', PostAddView);
        
               post_add.render();
                var headerView =  Vm.create(this,'HeaderView', HeaderView);
                headerView.render();
          },
          error:function(col,err){
            console.log('Error:');
            console.log(err);
            var serverNotOkView =  Vm.create(this,'ServerNotOkView', ServerNotOkView);
            serverNotOkView.render();
          }
        });   
      }
    
  });
  return DashboardPage;
});
