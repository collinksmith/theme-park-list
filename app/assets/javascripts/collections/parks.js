ThemeParkList.Collections.Parks = Backbone.Collection.extend({
  url: "/api/parks",
  model: ThemeParkList.Models.Park,

  parse: function (response) {
    this.page = response.page;
    this.total_pages = response.total_pages;
    this.total_items = response.total_items;
    return response.parks;
  }
});
