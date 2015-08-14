ThemeParkList.Views.Info = Backbone.View.extend({
  template: JST["parks/show_tabs/info"],

  render: function () {
    this.$el.html(this.template({ park: this.model }));
    return this;
  }
});