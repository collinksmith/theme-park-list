ThemeParkList.Views.ParkShow = Backbone.CompositeView.extend({
  template: JST['parks/park_show'],

  events: {
    "click .show-tab": "updatePanel",
    "click .close-btn": "myRemove",
    "click .m-background": "myRemove",
    "submit #review-form": "submitReview",
    "click #favorite": "toggleFavorite"
  },

  initialize: function () {
    this.subview = new ThemeParkList.Views.Info({ model: this.model });
    this.addSubview(".show-panel", this.subview);
    $(document).on("keyup", this.handleKeyup.bind(this));

    // Prevent scrolling in main window
    $("body").css({ overflow: "hidden" });
  },

  render: function () {
    this.$el.html(this.template({ park: this.model }));
    this.attachSubviews();
    return this;
  },

  updatePanel: function (event) {
    $newTab = $(event.currentTarget);
    if ($newTab.hasClass("active")) { return; }
    this.updateActiveTab($newTab.text());

    var newSubview;
    switch ($newTab.text()) {
      case "Scores":
        newSubview = new ThemeParkList.Views.Scores({ model: this.model });
        break;
      case "Info":
        newSubview = new ThemeParkList.Views.Info({ model: this.model });
        break;
      case "Reviews":
        newSubview = new ThemeParkList.Views.ReviewsIndex({ 
          collection: this.model.reviews()
        });
        break;
      case "Parks Nearby":
        newSubview = new ThemeParkList.Views.Nearby({ model: this.model });
        break;
      case "Write a Review":
        var newReview = new ThemeParkList.Models.Review();
        newSubview = new ThemeParkList.Views.ReviewForm({ model: newReview });
        break;
    }

    this.swapInSubview(newSubview);
  },

  // Takes the text of the tab to be activated. Removes any other active tabs
  // and adds the 'active' class to the new tab.
  updateActiveTab: function (newTabText) {
    this.$(".nav-tabs").find(".active").removeClass("active");
    var $newTab = this.$(".nav-tabs li:contains(" + newTabText + ")");
    $newTab.addClass("active");
  },

  handleKeyup: function (event) {
    if (event.keyCode === 27) { this.myRemove(); }
  },

  myRemove: function () {
    // Allow scrolling in the main window
    $("body").css({ overflow: "inherit" });
    this.trigger("remove");
    this.remove();
  },

  swapInSubview: function (newSubview) {
    this.removeSubview(".show-panel", this.subview);
    this.subview = newSubview;
    this.addSubview(".show-panel", this.subview);
  },

  submitReview: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    formData.review.park_id = this.model.id;
    formData.review.user_id = ThemeParkList.CURRENT_USER.id;

    var newReview = new ThemeParkList.Models.Review();
    var view = this;

    newReview.save(formData, {
      // On success, fetch the park model and switch to the Reviews tab
      success: function () {
        view.model.fetch({
          success: function (model) {
            var newView = new ThemeParkList.Views.ReviewsIndex({ 
              collection: view.model.reviews()
            });
            view.swapInSubview(newView);
            view.updateActiveTab("Reviews");
            this.$("#write-review").remove();
          }
        });
      },
      error: function (model, response) {
        var errors = _(response.responseJSON);
        errors.each(function (error) {
          // Add an error subview to the current subview (will be reviewForm)
          view.eachSubview(function (subview) { 
            subview.addError.call(subview, error);
          });
        });
      }
    });
  },

  toggleFavorite: function () {
    this.model.toggleFavorite();
    this.toggleFavoriteButton();
  },

  toggleFavoriteButton: function () {
    $btn = this.$("#favorite");
    if ($btn.text() === "Favorite Park") {
      $btn.text("Unfavorite Park");
    } else {
      $btn.text("Favorite Park")
    }
  },

  convertZeroToNull: function (el) {
    if (el === 0) { el = null; }
  }
});