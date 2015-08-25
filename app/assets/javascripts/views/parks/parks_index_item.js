ThemeParkList.Views.ParksIndexItem = Backbone.View.extend({
  template: JST['parks/parks_index_item'],
  className: "parks-index-item-container col-xs-12 col-sm-6 col-lg-4",

  events: {
    "click": "addParkShowView",
    "mouseenter": "addScoreBars",
    "mouseleave": "removeScoreBars"
  },

  render: function () {
    var tempUnit = $(".temp.selected-format").text();
    this.$el.html(this.template({ park: this.model, tempUnit: tempUnit }));
    return this;
  },

  setTemp: function (tempUnit) {
    var temp = this.model.temp(tempUnit);
    this.$(".temp-text").text(temp);
  },

  addParkShowView: function () {
    var showModel = new ThemeParkList.Models.Park({ id: this.model.id });
    showModel.fetch({
      success: function (model) {
        var parkShowView = new ThemeParkList.Views.ParkShow({ model: model });
        $("body").append(parkShowView.render().$el);
      }
    });
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
    this.$(".bar").stop();
    this.$(".bar").css("width", 0);
  }
});