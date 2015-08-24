window.ThemeParkList = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  CURRENT_USER: {},
  initialize: function() {
    var $rootEl = $("#content");
    var parks = new ThemeParkList.Collections.Parks();
    new ThemeParkList.Routers.Router({
      $rootEl: $rootEl,
      collection: parks
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
});
