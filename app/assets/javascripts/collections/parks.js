ThemeParkList.Collections.Parks = Backbone.Collection.extend({
  url: "/api/parks",
  model: ThemeParkList.Models.Park
});
