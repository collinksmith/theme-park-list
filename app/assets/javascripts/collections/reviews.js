ThemeParkList.Collections.Reviews = Backbone.Collection.extend({
  url: "/api/reviews",
  model: ThemeParkList.Models.Review,

  initialize: function (options) {
    this.park = options.park;
  }
});