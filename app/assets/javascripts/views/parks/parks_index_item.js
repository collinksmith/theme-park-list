ThemeParkList.Views.ParksIndexItem = Backbone.View.extend({
  template: JST['parks/parks_index_item'],
  className: "parks-index-item",

  initialize: function () {
  },

  render: function () {
    this.$el.html(this.template({ park: this.model }));
    return this;
  }
});