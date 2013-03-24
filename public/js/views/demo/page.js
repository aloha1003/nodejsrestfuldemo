define([
  'view',
  'text!templates/demo/template.html',
  'views/demo/header',
  'views/demo/servernotok',
  'collections/serverok',
  'collections/user',
  'views/demo/index'
], function( Vm, indexTemplate,HeaderView,ServerNotOkView,ServerOkCollection,UserCollection,IndexView){
 
  var DashboardPage = Backbone.View.extend({

    el: '.page',
    render: function () {
      $(this.el).html(indexTemplate);
      var serverok = new ServerOkCollection();
        serverok.fetch({
          success:function(res){
           
             var indexView =  Vm.create(this,'IndexView', IndexView);
                indexView.render();
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
