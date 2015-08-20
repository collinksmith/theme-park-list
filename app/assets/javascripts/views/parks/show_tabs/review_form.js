ThemeParkList.Views.ReviewForm = Backbone.View.extend({
  template: JST["parks/show_tabs/review_form"],

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});