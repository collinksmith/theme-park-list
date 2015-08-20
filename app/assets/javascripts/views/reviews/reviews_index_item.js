ThemeParkList.Views.ReviewsIndexItem = Backbone.View.extend({
  template: JST["reviews/reviews_index_item"],

  render: function () {
    this.$el.html(this.template({ review: this.model }));
    return this;
  }
});