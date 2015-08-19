ThemeParkList.Views.Info = Backbone.View.extend({
  template: JST["parks/show_tabs/info"],
  className: "show-details",

  render: function () {
    var tempUnit = $(".temp.selected-format").text();
    this.$el.html(this.template({ park: this.model, tempUnit: tempUnit }));
    return this;
  }
});