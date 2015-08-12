ThemeParkList.Views.ParksFilters = Backbone.View.extend({
  template: JST['parks/parks_filters'],
  className: "container",

  events: {
    "slide #slider-range": "handleSlide"
  },

  initialize: function () {

    this.$("#slider-range").slider({
      range: true
      min: 20,
      max: 300,
    })
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  handleSlide: function () {
    
  }
});