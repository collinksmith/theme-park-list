ThemeParkList.Views.Explore = Backbone.CompositeView.extend({
  template: JST["explore/explore"],

  events: {
    "click #btn-filter": "filterParks",
    "keyup #search-box": "searchParks",
    // "keypress #search-box": "handleKeypress",
    "click .sort-criterion": "sortParks"
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

  searchParks: function (event) {
    // Don't search if user presses tab or arrow keys
    var code = event.keyCode;
    if (code === 9 || (code >= 37 && code <= 40)) { return }
      
    var query = $("#search-box").val();
    this.fetchParks({ page: 1, query: query })
  },

  filterParks: function () {
    var filters = [];
    $(".selected-filter").each(function (index, filterBtn) {
      filters.push($(filterBtn).text());
    });    
    this.filters = filters;
    this.fetchParks({ page: 1, filters: this.filters, sort: this.sort });
  },

  sortParks: function (event) {
    this.sort = $(event.currentTarget).children().text()
    this.fetchParks({ page: 1, filters: this.filters, sort: this.sort })
  },

  fetchParks: function (data) {
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
  }
});