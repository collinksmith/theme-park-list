ThemeParkList.Views.ReviewsIndex = Backbone.CompositeView.extend({
  template: JST["reviews/reviews_index"],

  initialize: function () {
    this.collection.each(this.addReviewSubview.bind(this));
  },

  render: function () {
    var reviewsPresent = this.collection.length > 0;
    this.$el.html(this.template({ 
      reviewsPresent: reviewsPresent,
      user: this.collection.user
    }));
    this.attachSubviews();

    if (reviewsPresent) {
      this.initRaty();
    }
    return this;
  },

  addReviewSubview: function (review) {
    // Only show the review if it has a title or body
    if (review.escape("title") !== "" || review.escape("body") !== "") {
      var reviewSubview = new ThemeParkList.Views.
                              ReviewsIndexItem({ model : review});
      this.addSubview(".reviews", reviewSubview);
    }
  },

  initRaty: function () {
    var ratings = ["overall", "atmosphere", "family_friendliness",
                   "intensity", "wait_times", "cost"];
    _.each(ratings, this.initRating.bind(this));
  },

  initRating: function(name) {
    var id = "#" + name + "-rating-avg";
    var allRatings = this.collection.pluck(name);
    var score = this.average(allRatings);

    this.$(id).raty({
      readOnly: true,
      score: score,
      hints: [score, score, score, score, score],
      starOn: "/icons/star-on.png",
      starOff: "/icons/star-off.png",
      starHalf: "/icons/star-half.png"
    });
  },

  average: function(array) {
    var total = 0;
    _.each(array, function(el) {
      total += el;
    });

    // Don't include null values when calculating the average
    var avg = total / (_.without(array, null).length) ;
    return avg.toFixed(2);
  }
});