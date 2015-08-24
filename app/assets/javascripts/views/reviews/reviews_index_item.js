ThemeParkList.Views.ReviewsIndexItem = Backbone.CompositeView.extend({
  template: JST["reviews/reviews_index_item"],
  className: "reviews-index-item group",

  events: {
    "click #edit-review": "editReview",
    "click #delete-review": "deleteReview",
    "submit #edit-review-form": "updateReview"
  },

  initialize: function (options) {
    this.user = options.user;
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({
      review: this.model,
      user: this.user,
      form: this.form
    }));
    
    this.initRaty();
    return this;
  },

  editReview: function () {
    this.form = true;
    this.render();
  },

  deleteReview: function () {
    this.model.destroy();
    this.remove();
  },

  updateReview: function (event) {
    event.preventDefault();
    var view = this;

    var formData = $(event.currentTarget).serializeJSON();
    view.model.save(formData, {
      // On success, re-render without the form
      success: function () {
        view.form = false;
        view.render();
      },
      error: function (model, response) {
        var errors = _(response.responseJSON);
        errors.each(function (error) {
          // Add an error subview
          var errorView = new ThemeParkList.Views.Errors({ error: error })
          view.addSubview(".errors", errorView);
        });
      }
    });
  },

  initRaty: function () {
    var ratings = ["overall", "atmosphere", "family_friendliness",
                   "intensity", "wait_times", "cost"]
    _.each(ratings, this.initRating.bind(this))
  },

  initRating: function (name) {
    var score = this.model.get(name);
    var id = "#" + name + "-rating";
    var scoreName = "review[" + name + "]"

    this.$(id).raty({
      scoreName: scoreName,
      score: score,
      readOnly: !this.form,
      starOn: "/icons/star-on.png",
      starOff: "/icons/star-off.png"
    })
  }
});