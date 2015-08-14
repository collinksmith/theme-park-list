ThemeParkList.Views.ParkShow = Backbone.CompositeView.extend({
  template: JST['parks/park_show'],
  className: "m-background",

  initialize: function () {
    var scoresView = new ThemeParkList.Views.Scores({ model: this.model });
    this.addSubview(".show-tab", scoresView);
  },

  render: function () {
    this.$el.html(this.template({ park: this.model }));
    this.attachSubviews();
    return this;
  }
})