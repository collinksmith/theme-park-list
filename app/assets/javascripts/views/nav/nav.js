ThemeParkList.Views.Nav = Backbone.View.extend({
  template: JST['nav/nav'],
  el: 'body',

  initialize: function () {

  },

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});