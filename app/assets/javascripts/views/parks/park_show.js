ThemeParkList.Views.ParkShow = Backbone.CompositeView.extend({
  template: JST['parks/park_show'],

  initialize: function () {
    var scoresView = new ThemeParkList.Views.Scores({ model: this.model });
    this.addSubview(scoresView);
  },

  render: function () {
    this.$el.html(this.template({ park: this.model }));
    this.attachSubviews();
    return this;
  }
})