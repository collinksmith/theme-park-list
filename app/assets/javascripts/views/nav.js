ThemeParkList.Views.Nav = Backbone.View.extend({
  template: JST["nav"],

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});