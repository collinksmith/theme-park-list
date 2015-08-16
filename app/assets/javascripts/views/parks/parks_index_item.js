ThemeParkList.Views.ParksIndexItem = Backbone.View.extend({
  template: JST['parks/parks_index_item'],
  className: "parks-index-item",

  events: {
    "click": "addParkShowView",
    "mouseenter": "toggleScoreBars",
    "mouseleave": "toggleScoreBars"
  },

  render: function () {
    this.$el.html(this.template({ park: this.model }));
    this.toggleScoreBars();
    return this;
  },

  addParkShowView: function () {
    var parkShowView = new ThemeParkList.Views.ParkShow({ model: this.model });
    $("body").append(parkShowView.render().$el);
  },

  toggleScoreBars: function () {
    console.log("toggling bars");
    this.$(".bar").animate({
      width: "toggle"
    }, 500);
  }
});