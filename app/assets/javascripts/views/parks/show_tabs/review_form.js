ThemeParkList.Views.ReviewForm = Backbone.View.extend({
  template: JST["parks/show_tabs/review_form"],

  initialize: function () {
     $('.stars').raty({
      score: 3,
      starOn: "/icons/star-on.png",
      starOff: "/icons/star-off.png"
    });

  },

  render: function () {
    this.$el.html(this.template());
    this.initRaty();
    return this;
  },

  initRaty: function () {
    var ratings = ["overall", "atmosphere", "family_friendliness",
                   "intensity", "wait_times", "cost"]
    _.each(ratings, this.initRating)
  },

  initRating: function(name) {
    var id = "#" + name + "-rating";
    var scoreName = "review[" + name + "]"

    this.$(id).raty({
      scoreName: scoreName,
      starOn: "/icons/star-on.png",
      starOff: "/icons/star-off.png"
    })
  }
});