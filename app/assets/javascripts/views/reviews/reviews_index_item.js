ThemeParkList.Views.ReviewsIndexItem = Backbone.View.extend({
  template: JST["reviews/reviews_index_item"],
  className: "reviews-index-item group",

  events: {
    "click #edit-review": "editReview",
    "click #delete-review": "deleteReview"
  },

  initialize: function (options) {
    this.user = options.user
  },

  render: function () {
    this.$el.html(this.template({
      review: this.model,
      user: this.user,
      form: this.form
    }));
    
    this.initRaty();
    return this;
  },

  editReview: function () {
    this.form = true;
    this.render();
  },

  deleteReview: function () {

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
      readOnly: !this.form,
      starOn: "/icons/star-on.png",
      starOff: "/icons/star-off.png"
    })
  }
});