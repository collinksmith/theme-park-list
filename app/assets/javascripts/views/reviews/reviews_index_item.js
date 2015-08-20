ThemeParkList.Views.ReviewsIndexItem = Backbone.View.extend({
  template: JST["reviews/reviews_index_item"],

  render: function () {
    this.$el.html(this.template({ review: this.model }));
    this.initRaty();
    return this;
  },

  initRaty: function () {
    var ratings = ["overall", "atmosphere", "family_friendliness",
                   "intensity", "wait_times", "cost"]
    _.each(ratings, this.initRating.bind(this))
  },

  initRating: function (name) {
    var score = this.model.get(name);
    var id = "#" + name + "-rating";

    this.$(id).raty({
      score: score,
      readOnly: true,
      starOn: "/icons/star-on.png",
      starOff: "/icons/star-off.png"
    })
  }
});