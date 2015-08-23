ThemeParkList.Views.User = Backbone.View.extend({
  template: JST["user"],

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    return this;
  }
});