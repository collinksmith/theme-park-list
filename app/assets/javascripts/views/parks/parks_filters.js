ThemeParkList.Views.ParksFilters = Backbone.View.extend({
  template: JST['parks/parks_filters'],
  className: "container",

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});