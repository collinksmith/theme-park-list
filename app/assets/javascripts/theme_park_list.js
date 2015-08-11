window.ThemeParkList = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $("#content");
    new ThemeParkList.Routers.Router({
      $rootEl: $rootEl,
    })
  }
};

$(document).ready(function(){
  ThemeParkList.initialize();
});
