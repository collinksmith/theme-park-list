ThemeParkList.Views.ParksFilters = Backbone.View.extend({
  template: JST['parks/parks_filters'],
  className: "container filters",

  events: {
    "slide #slider-range": "handleSlide",
    "click .filter-group": "selectFilter",
    "click .format-group": "selectFormat"
  },

  initialize: function () {
    this.listenTo(this.collection, "sync", this.updateItemCount)
  },

  render: function () {
    this.$el.html(this.template({ parks: this.collection }));
    this.addSlider();
    return this;
  },

  setOptions: function (options) {
    this.collection = options.collection || this.collection;
    this.sort = options.sort || this.sort;
    this.updateItemCount();
    if (this.sort) { this.updateSortText(); }
  },

  updateItemCount: function () {
    this.$('.filter-num').text(this.collection.total_items + 
                               " Theme Parks Found");
  },

  updateSortText: function () {
    this.$("#sort-text").text(this.sort.toUpperCase())
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