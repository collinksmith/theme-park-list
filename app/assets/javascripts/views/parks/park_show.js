ThemeParkList.Views.ParkShow = Backbone.CompositeView.extend({
  template: JST['parks/park_show'],

  events: {
    "click .show-tab": "updatePanel"
  },

  initialize: function () {
    var scoresView = new ThemeParkList.Views.Scores({ model: this.model });
    this.addSubview(".show-panel", scoresView);
  },

  render: function () {
    this.$el.html(this.template({ park: this.model }));
    this.attachSubviews();
    return this;
  },

  updatePanel: function (event) {
    $newTab = $(event.currentTarget);
    if ($newTab.hasClass("active")) { return }
    $newTab.parent().find(".active").removeClass("active");
    $newTab.addClass("active");


    var newSubview
    switch ($newTab.text()) {
      case "Scores":
        newSubview = new ThemeParkList.Views.Scores({ model: this.model });
        break;
      case "Info":
        newSubview = new ThemeParkList.Views.Info({ model: this.model });
        break;
      case "Reviews":
        newSubview = new ThemeParkList.Views.Reviews({ model: this.model });
        break;
      case "Parks Nearby":
        newSubview = new ThemeParkList.Views.Nearby({ model: this.model });
        break;
    }

    this.swapInSubview(newSubview);
  },

  swapInSubview: function (newSubview) {
    this.removeModelSubview(".show-panel", this.model);
    this.addSubview(".show-panel", newSubview);
  }
})