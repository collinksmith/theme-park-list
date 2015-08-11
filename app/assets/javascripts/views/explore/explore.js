ThemeParkList.Views.Explore = Backbone.CompositeView.extend({
  template: JST["explore/explore"],

  initialize: function () {
    var parksIndexView = new ThemeParkList.Views.
                             ParksIndex({ collection: this.collection });
    this.addSubview(".parks-index", parksIndexView);
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  }
});