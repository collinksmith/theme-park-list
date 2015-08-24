ThemeParkList.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["user_show"],

  events: {
    "click #my-reviews": "addReviews",
    "click #my-parks": "addParks"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);

    this.navView = new ThemeParkList.Views.Nav({ search: false });
    this.addSubview("#nav", this.navView);

  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    this.addReviews();
    this.attachSubviews();
    return this;
  },

  addReviews: function () {
    this.subview = new ThemeParkList.Views.ReviewsIndex({
      collection: this.model.reviews()
    });
    this.swapInSubview(this.subview);
  },

  swapInSubview: function (newSubview) {
    this.removeSubview(".show-panel", this.subview);
    this.subview = newSubview;
    this.addSubview(".show-panel", this.subview);
  },
});