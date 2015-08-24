ThemeParkList.Views.User = Backbone.View.extend({
  template: JST["user"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    return this;
  }
});