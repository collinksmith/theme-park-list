ThemeParkList.Collections.Reviews = Backbone.Collection.extend({
  url: "/api/reviews",
  model: ThemeParkList.Models.Review
});