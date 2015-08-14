ThemeParkList.Views.Scores = Backbone.View.extend({
  template: JST['parks/show_tabs/scores'],

  render: function () {
    this.$el.html(this.template({ park: this.model }));
    return this;
  }
});