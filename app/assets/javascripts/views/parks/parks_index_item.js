ThemeParkList.Views.ParksIndexItem = Backbone.View.extend({
  template: JST['parks/parks_index_item'],
  className: "parks-index-item col-xs-4",

  events: {
    "click": "addParkShowView"
  },

  render: function () {
    this.$el.html(this.template({ park: this.model }));
    return this;
  },

  addParkShowView: function () {
    var parkShowView = new ThemeParkList.Views.ParkShow({ model: this.model });
    $("body").append(parkShowView.render().$el);
  }
});