ThemeParkList.Views.ReviewForm = Backbone.View.extend({
  template: JST["parks/show_tabs/review_form"],

  events: {
    "submit #review-form": "submitReview"
  },

  render: function () {
    this.$el.html(this.template());
    this.initRaty();
    return this;
  },

  submitReview: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    formData.review.park_id = this.model.id;
    formData.review.user_id = ThemeParkList.CURRENT_USER.id;
    debugger;
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