ThemeParkList.Views.ReviewsIndex = Backbone.CompositeView.extend({
  template: JST["reviews/reviews_index"],

  initialize: function () {
    this.collection = this.model.reviews()
    this.collection.each(this.addReviewSubview.bind(this));

    this.listenTo(this.collection, "add", this.addReviewSubview);
  },

  render: function () {
    this.$el.html(this.template({ park: this.model }));
    return this;
  },

  addReviewSubview: function (review) {
    var reviewSubview = new ThemeParkList.Views.
                            ReviewsIndexItem({ model : review});
    this.addSubview(".reviews", reviewSubview);
  }
});