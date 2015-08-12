ThemeParkList.Views.ParksFilters = Backbone.View.extend({
  template: JST['parks/parks_filters'],
  className: "container filters",

  events: {
    "slide #slider-range": "handleSlide",
    "click button": "selectFilter"
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
    this.$("#amount-left").html("$" + this.$("#slider-range").slider("values", 0));
    this.$("#amount-right").html("$" + this.$("#slider-range").slider("values", 1));
  },

  // Update values for price indicator
  handleSlide: function (event, ui) {
    this.$("#amount-left").html("$" + ui.values[0]);
    this.$("#amount-right").html("$" + ui.values[1]);
  },

  selectFilter: function (event) {
    var newFilter = $(event.currentTarget);

    newFilter.siblings().each(function (index, filterButton) {
      $(filterButton).removeClass("selected-filter")
    });

    newFilter.addClass("selected-filter");
  }
});