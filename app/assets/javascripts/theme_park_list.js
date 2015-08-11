window.ThemeParkList = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $("#content");
    new ThemParkList.Routers.Router({
      $rootEl = $rootEl,
      collection = collection
    })
  }
};

$(document).ready(function(){
  ThemeParkList.initialize();
});
