ThemeParkList.Views.Nav = Backbone.View.extend({
  template: JST['nav/nav'],
  tagName: "nav",
  className: "navbar",

  initialize: function () {

  },

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});