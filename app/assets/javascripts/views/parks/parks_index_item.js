ThemeParkList.Views.ParksIndexItem = Backbone.View.extend({
  template: JST['parks/parks_index_item'],
  className: "parks-index-item",

  events: {
    "click": "addParkShowView",
    "mouseenter": "addScoreBars",
    "mouseleave": "removeScoreBars"
  },

  render: function () {
    this.$el.html(this.template({ park: this.model }));
    return this;
  },

  addParkShowView: function () {
    var parkShowView = new ThemeParkList.Views.ParkShow({ model: this.model });
    $("body").append(parkShowView.render().$el);
  },

  addScoreBars: function () {
    this.$(".bar").each(function(index, bar) {
      var $bar = $(bar);
      var score = $bar.data("score");
      $bar.animate({
        width: score
      }, 300);
    });
  },

  removeScoreBars: function () {
    this.$(".bar").css("width", 0);
  }
});