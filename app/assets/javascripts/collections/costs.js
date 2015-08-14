ThemeParkList.Collections.Costs = Backbone.Collection.extend({
  url: "/api/costs",
  model: ThemeParkList.Models.Cost,

  initialize: function (models, options) {
    this.park = options.park;
  }
});