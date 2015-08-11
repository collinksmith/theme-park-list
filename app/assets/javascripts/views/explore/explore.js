ThemeParkList.Views.Explore = Backbone.CompositeView.extend({
  template: JST["explore/expore"],

  initialize: function () {
    
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});