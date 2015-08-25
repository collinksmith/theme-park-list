ThemeParkList.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["user_show"],

  events: {
    "click .user-tab": "updatePanel",
  },

  initialize: function () {
    this.model.fetch({
      success: function () {
        this.addReviews();
      }.bind(this)
    })
    this.navView = new ThemeParkList.Views.Nav({ search: false });
    this.addSubview("#nav", this.navView);

    this.listenTo(this.model.parks(), "showRemoved", this.refreshParks);
  },

  // Refresh parks in case the favorite status was changed
  refreshParks: function () {
    this.model.fetch({
      success: function () {
        this.addParks();
      }.bind(this)
    })
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    this.attachSubviews();
    return this;
  },

  updatePanel: function (event) {
    $newTab = $(event.currentTarget);
    if ($newTab.hasClass("active")) { return; }
    this.updateActiveTab($newTab.text());

    var newSubview;
    switch ($newTab.text()) {
      case "My Reviews":
        this.addReviews();
        break;
      case "My Parks":
        this.addParks();
        break;
    }
  },

  addReviews: function (event) {
    var reviewsView = new ThemeParkList.Views.ReviewsIndex({
      collection: this.model.reviews()
    });
    this.swapInSubview(reviewsView);
  },

  addParks: function (event) {
    var view = this;
    this.model.parks().fetch({
      data: { user_id: view.model.id },
      success: function () {
        var parksIndexView = new ThemeParkList.Views.ParksIndex({ 
          collection: view.model.parks(),
          userPage: true,
        });
        view.swapInSubview(parksIndexView);
      }
    })
  }, 

  // Takes the text of the tab to be activated. Removes any other active tabs
  // and adds the 'active' class to the new tab.
  updateActiveTab: function (newTabText) {
    this.$(".nav-tabs").find(".active").removeClass("active");
    var $newTab = $(".nav-tabs li:contains(" + newTabText + ")");
    $newTab.addClass("active");
  },

  swapInSubview: function (newSubview) {
    if (this._currentSubview) {
      this.removeSubview(".show-panel", this._currentSubview);
    }
    this._currentSubview = newSubview;
    this.addSubview(".show-panel", newSubview);
  }
});