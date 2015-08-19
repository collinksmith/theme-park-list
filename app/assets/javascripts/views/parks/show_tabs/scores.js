ThemeParkList.Views.Scores = Backbone.View.extend({
  template: JST["parks/show_tabs/scores"],
  className: "show-details",

  render: function () {
    this.$el.html(this.template({ park: this.model }));
    this.addScoreBars()
    return this;
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
});

