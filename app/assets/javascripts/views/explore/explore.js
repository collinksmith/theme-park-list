ThemeParkList.Views.Explore = Backbone.CompositeView.extend({
  template: JST["explore/explore"],

  events: {
    "click #btn-filter": "filterParks",
    "input #search-box": "searchParks",
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

    $(".typeahead").typeahead({
        minLength: 3
      },
      {
        name: "parks",
        source: this.substringMatcher(ThemeParkList.PARK_NAMES)
    });
    
    $(window).scroll(this.fetchIfAtBottom.bind(this));
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  searchParks: function (event) {
    var query = $(event.currentTarget).val();
    this.fetchParks({ page: 1, query: query })
  },

  filterParks: function () {
    var filters = [];
    $(".selected-filter").each(function (index, filterBtn) {
      filters.push($(filterBtn).text());
    });    
    this.filters = filters;
    this.fetchParks({ page: 1, filters: this.filters });
  },

  sortParks: function (event) {
    var sort = $(event.currentTarget).children().text()
    this.fetchParks({ page: 1, filters: this.filters, sort: sort })
  },

  fetchParks: function (data) {
    this.collection = new ThemeParkList.Collections.Parks();
    this.collection.fetch({
      remove: false,
      data: data,
      success: function (collection) {
        this.filterView.setCollection(collection);
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
        data: { page: page + 1, filters: this.filters }
      });
    }
  },

  substringMatcher: function(strs) {
    return function findMatches(q, cb) {
      var matches, substringRegex;

      // an array that will be populated with substring matches
      matches = [];

      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');

      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          matches.push(str);
        }
      });

      cb(matches);
    };
  }
});