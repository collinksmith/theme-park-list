window.ThemeParkList = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  CURRENT_USER: {},
  initialize: function() {
    var $rootEl = $("#content");
    var $navEl = $("#nav");
    var parks = new ThemeParkList.Collections.Parks();
    new ThemeParkList.Routers.Router({
      $rootEl: $rootEl,
      $navEl: $navEl,
      collection: parks
    });
  }
};

$(document).ready(function(){
});
