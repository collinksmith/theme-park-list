ThemeParkList.Views.Nearby = Backbone.View.extend({
  template: JST["parks/show_tabs/nearby"],

  render: function () {
    this.$el.html(this.template({ park: this.model }));
    return this;
  }
});