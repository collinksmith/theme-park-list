window.ThemeParkList = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $("#content");
    var parks = new ThemeParkList.Collections.Parks();
    new ThemeParkList.Routers.Router({
      $rootEl: $rootEl,
      collection: parks
    });
  }
};

$(document).ready(function(){
  ThemeParkList.initialize();
});
