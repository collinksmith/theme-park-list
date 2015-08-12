ThemeParkList.Views.ParksFilters = Backbone.View.extend({
  template: JST['parks/parks_filters'],
  className: "container filters",

  events: {
    "slide #slider-range": "handleSlide",
    "click .filter-group": "selectFilter",
    "click .format-group": "selectFormat"
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
    var newFilter = $(event.target);

    newFilter.siblings().each(function (index, filterButton) {
      $(filterButton).removeClass("selected-filter")
    });

    newFilter.toggleClass("selected-filter");
  },

  selectFormat: function (event) {
    var newFormat = $(event.target);

    newFormat.siblings().each(function (index, formatButton) {
      $(formatButton).removeClass("selected-format")
    });

    newFormat.addClass("selected-format")
  }
});