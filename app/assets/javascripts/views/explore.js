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
    this.parksIndexView = new ThemeParkList.Views.ParksIndex({ 
      collection: this.collection 
    });
    this.addSubview("#parks-index", this.parksIndexView);

    this.filterView = new ThemeParkList.Views.ParksFilters({ 
      collection: this.collection 
    });
    this.addSubview("#filters", this.filterView);
    
    this.navView = new ThemeParkList.Views.Nav({ 
      search: true
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
    this.setFilters();
    this.updateCurrentView(); 
  },

  searchParks: function (event) {
    // Don't search if user presses tab or arrow keys
    var code = event.keyCode;
    if (code === 9 || (code >= 37 && code <= 40)) { return; }
      
    var query = $("#search-box").val();
    if (this.mapViewPresent) {
      this.setGrid(null, { query: query });
    } else {
      this.fetchParks({query: query });
    }
  },

  filterParks: function () {
    this.setFilters();
    this.setCosts();
    this.updateCurrentView();
  },

  setFilters: function () {
    var filters = [];
    $(".selected-filter").each(function (index, filterBtn) {
      filters.push($(filterBtn).text());
    });
    this.filters = filters;
  },

  setCosts: function () {
    this.costs = this.$("#slider-range").slider("values");
  },

  updateCurrentView: function () {
    // If the map button is already selected, update the map.
    // Otherwise, update the parks index.
    if (this.mapViewPresent) {
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
      season: this.season,
      costs: this.costs
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

    this.updateParksIndex();
  },

  updateParksIndex: function () {
    this.removeSubview("#parks-index", this.parksIndexView);
    this.parksIndexView = new ThemeParkList.Views.ParksIndex({ 
      collection: this.collection 
    });
    this.addSubview("#parks-index", this.parksIndexView);
  },

  fetchIfAtBottom: function () {
    if ( this.mapViewPresent ) { return; }
    var page = this.collection.page;
    if ((window.innerHeight + window.scrollY) >= $(document).height() && 
         page > 0 && page < this.collection.total_pages) {
      this.collection.fetch({
        remove: false,
        data: { 
          page: page + 1,
          filters: this.filters,
          sort: this.sort,
          season: this.season,
          costs: this.costs
        }
      });
    }
  },

  setMap: function (updateFilter) {
    // Don't do anything if the map is already shown and not updating filters
    if (this.mapViewPresent && !updateFilter) { return; }
    this.mapViewPresent = true;
    $("#map").css("height", "80%");
    $(".sort-group").css("display", "none");

    this.removeSubview("#parks-index", this.parksIndexView);
    if (this.mapView) { this.removeSubview("#map", this.mapView); }
    
    this.collection.fetch({
      data: { 
        page: "all",
        filters: this.filters,
        season: this.season,
        costs: this.costs
      },
      success: function (collection) {
        this.mapView = new ThemeParkList.Views.Map({ 
          collection: collection
        });
        this.addSubview("#map", this.mapView);
        this.mapView.initMap();
        this.filterView.setOptions({ collection: collection });
      }.bind(this)
    });
  },

  setGrid: function (event, data) {
    this.mapViewPresent = false;
    $("#map").css("height", "0px");
    $(".sort-group").css("display", "block");
    $(".btn.grid").addClass("selected-format");
    $(".btn.map").removeClass("selected-format");
    this.removeSubview("#map", this.mapView);
    this.fetchParks(data);
  }
});