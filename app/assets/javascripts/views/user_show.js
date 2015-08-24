ThemeParkList.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["user_show"],

  events: {
    "click #my-reviews": "addReviews",
    "click #my-parks": "addParks"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.model.fetch({
      success: function () {
        this.addReviews();
      }.bind(this)
    })
    this.navView = new ThemeParkList.Views.Nav({ search: false });
    this.addSubview("#nav", this.navView);
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    this.attachSubviews();
    return this;
  },

  addReviews: function (event) {
    if (event) {
      $newTab = $(event.currentTarget);
      if ($newTab.hasClass("active")) { return; }
    }
    this.updateActiveTab("My Reviews");

    var reviewsView = new ThemeParkList.Views.ReviewsIndex({
      collection: this.model.reviews()
    });
    this.swapInSubview(reviewsView);
    this.render();
  },

  addParks: function (event) {
    $newTab = $(event.currentTarget);
    if ($newTab.hasClass("active")) { return; }
    this.updateActiveTab($newTab.text());

    var view = this;
    this.model.parks().fetch({
      data: { user_id: view.model.id },
      success: function () {
        var parksIndexView = new ThemeParkList.Views.ParksIndex({ 
          collection: view.model.parks()
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