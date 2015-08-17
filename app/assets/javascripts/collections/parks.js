ThemeParkList.Collections.Parks = Backbone.Collection.extend(
  _.extend({}, ThemeParkList.Mixins.Filterable, {
    url: "/api/parks",
    model: ThemeParkList.Models.Park,

    parse: function (response) {
      this.page = response.page;
      this.total_pages = response.total_pages;
      return response.parks;
    }
  })
);
