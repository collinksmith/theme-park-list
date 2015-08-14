ThemeParkList.Views.ParkShow = Backbone.View.extend({
  template: JST['parks/park_show'],

  render: function () {
    this.$el.html(this.template({ park: this.model }));
    return this;
  }
})