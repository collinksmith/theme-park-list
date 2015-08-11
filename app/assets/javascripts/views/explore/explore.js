ThemeParkList.Views.Explore = Backbone.CompositeView.extend({
  template: JST["explore/expore"],

  initialize: function () {
    var parksIndexView = new ThemeParkList.Views.ParksIndex();
    this.addSubview(".parks-index", parksIndexView);
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  }
});