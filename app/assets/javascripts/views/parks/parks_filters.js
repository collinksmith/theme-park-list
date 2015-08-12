ThemeParkList.Views.ParksFilters = Backbone.View.extend({
  template: JST['parks/parks_filters'],
  className: "container",

  events: {
    "slide #slider-range": "handleSlide"
  },

  initialize: function () {
  },

  render: function () {
    this.$el.html(this.template());
    this.addSlider();
    return this;
  },

  addSlider: function () {
    this.$("#slider-range").slider({
      range: true,
      min: 20,
      max: 300,
      values: [ 20, 300 ]
    });

    // Set initial values for price indicator
    this.$( "#amount" ).
      val( "$" + this.$( "#slider-range" ).slider( "values", 0 ) +
           " - $" + this.$( "#slider-range" ).slider( "values", 1 ) );
  },

  // Update values for price indicator
  handleSlide: function (event, ui) {
    this.$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
  }
});