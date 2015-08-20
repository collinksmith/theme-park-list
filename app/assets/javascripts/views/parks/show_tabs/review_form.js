ThemeParkList.Views.ReviewForm = Backbone.CompositeView.extend({
  template: JST["parks/show_tabs/review_form"],

  render: function () {
    this.$el.html(this.template());
    this.initRaty();
    return this;
  },

  addError: function (error) {
    var errorView = new ThemeParkList.Views.Error({ error: error });
    debugger
    this.addSubview(".errors", errorView);
  },

  initRaty: function () {
    var ratings = ["overall", "atmosphere", "family_friendliness",
                   "intensity", "wait_times", "cost"]
    _.each(ratings, this.initRating)
  },

  initRating: function(name) {
    var id = "#" + name + "-rating";
    var scoreName = "review[" + name + "]"

    this.$(id).raty({
      scoreName: scoreName,
      starOn: "/icons/star-on.png",
      starOff: "/icons/star-off.png"
    })
  }
});