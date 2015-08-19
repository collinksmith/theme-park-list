ThemeParkList.Views.Explore = Backbone.CompositeView.extend({
  template: JST["explore/explore"],

  events: {
    "click #btn-filter": "filterParks",
    "keyup #search-box": "searchParks",
    "click .sort-criterion": "sortParks",
    "click .temp": "setTemp",
    "click .season": "setSeason",
    "click .btn.map": "setMap",
    "click .btn.grid": "setGrid"
  },

  initialize: function (options) {
    this.CURRENT_USER = options.CURRENT_USER;
    this.parksIndexView = new ThemeParkList.Views.ParksIndex({ 
      collection: this.collection 
    });

    this.addSubview("#parks-index", this.parksIndexView);
    this.filterView = new ThemeParkList.Views.ParksFilters({ 
      collection: this.collection 
    });

    this.addSubview("#filters", this.filterView);
    this.navView = new ThemeParkList.Views.Nav({ 
      CURRENT_USER: this.CURRENT_USER
    });

    this.addSubview("#nav", this.navView);
    $(window).scroll(this.fetchIfAtBottom.bind(this));
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  setTemp: function (event) {
    var tempUnit = $(event.currentTarget).text();
    this.parksIndexView.eachSubview(function (subview, selector) {
      subview.setTemp(tempUnit);
    });
  },

  setSeason: function (event) {
    this.season = $(event.currentTarget).text();
    this.fetchParks();
  },

  searchParks: function (event) {
    // Don't search if user presses tab or arrow keys
    var code = event.keyCode;
    if (code === 9 || (code >= 37 && code <= 40)) { return; }
      
    var query = $("#search-box").val();
    this.fetchParks({ query: query });
  },

  filterParks: function () {
    // Set filters
    var filters = [];
    $(".selected-filter").each(function (index, filterBtn) {
      filters.push($(filterBtn).text());
    });
    this.filters = filters;

    // If the map button is already selected, update the map.
    // Otherwise, update the parks index.
    if ($(".map.selected-format").text() === "Map") {
      this.setMap(true);
    } else {
      this.fetchParks();
    }
  },

  sortParks: function (event) {
    this.sort = $(event.currentTarget).children().text();
    this.fetchParks();
  },

  fetchParks: function (data) {
    data = data || {
      filters: this.filters,
      sort: this.sort,
      season: this.season
    };
    this.collection = new ThemeParkList.Collections.Parks();
    this.collection.fetch({
      remove: false,
      data: data,
      success: function (collection) {
        this.filterView.setOptions({
          collection: collection,
          sort: this.sort
        });
      }.bind(this)
    });

    this.updateParks();
  },

  updateParks: function () {
    this.removeSubview("#parks-index", this.parksIndexView);
    this.parksIndexView = new ThemeParkList.Views.ParksIndex({ 
      collection: this.collection 
    });
    this.addSubview("#parks-index", this.parksIndexView);
  },

  fetchIfAtBottom: function () {
    var page = this.collection.page;
    if ((window.innerHeight + window.scrollY) >= $(document).height() && 
         page > 0 && page < this.collection.total_pages) {
      this.collection.fetch({
        remove: false,
        data: { page: page + 1, filters: this.filters, sort: this.sort }
      });
    }
  },

  setMap: function (updateFilter) {
    // Don't do anything if the map is already shown and not updating filters
    if (this.mapViewPresent && !updateFilter) { return; }
    this.mapViewPresent = true;

    this.removeSubview("#parks-index", this.parksIndexView);
    if (this.mapView) { this.removeSubview("#map", this.mapView); }
    
    this.collection.fetch({
      data: { page: "all", filters: this.filters },
      success: function (collection) {
        this.mapView = new ThemeParkList.Views.Map({ 
          collection: collection
        });
        this.addSubview("#map", this.mapView);
        this.mapView.initMap();
      }.bind(this)
    });
  },

  setGrid: function () {
    this.mapViewPresent = false;
    this.removeSubview("#map", this.mapView);
    this.fetchParks();
  }
});