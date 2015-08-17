window.ThemeParkList = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Mixins: {},
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
