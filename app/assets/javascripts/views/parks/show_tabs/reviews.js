ThemeParkList.Views.Reviews = Backbone.View.extend({
  template: JST["parks/show_tabs/reviews"],

  render: function () {
    this.$el.html(this.template({ park: this.model }));
    return this;
  }
});