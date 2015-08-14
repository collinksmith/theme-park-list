ThemeParkList.Views.Scores = Backbone.View.extend({
  template: JST["parks/show_tabs/scores"],
  className: "show-details",
  tagName: "table",

  render: function () {
    this.$el.html(this.template({ park: this.model }));
    return this;
  }
});

