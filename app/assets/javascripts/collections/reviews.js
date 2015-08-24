ThemeParkList.Collections.Reviews = Backbone.Collection.extend({
  url: "/api/reviews",
  model: ThemeParkList.Models.Review,

  initialize: function (models, options) {
    this.park = options.park;
    this.user = options.user;
  }
});