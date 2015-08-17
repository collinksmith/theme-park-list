ThemeParkList.Views.Explore = Backbone.CompositeView.extend({
  template: JST["explore/explore"],

  events: {
    "click #btn-filter": "filterParks"
  },

  initialize: function () {
    this.parksIndexView = new ThemeParkList.Views.
                          ParksIndex({ collection: this.collection });
    this.addSubview(".parks-index", this.parksIndexView);

    var filterView = new ThemeParkList.Views.ParksFilters();
    this.addSubview(".filters", filterView);
    $(window).scroll(this.fetchIfAtBottom.bind(this));
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  updateParks: function () {
    this.removeSubview(".parks-index", this.parksIndexView);
    this.parksIndexView = new ThemeParkList.Views.
                          ParksIndex({ collection: this.collection });
    this.addSubview(".parks-index", this.parksIndexView);
    this.render();
  },

  filterParks: function () {
    var filters = [];
    $(".selected-filter").each(function (index, filterBtn) {
      filters.push($(filterBtn).text());
    });
    
    this.filters = filters;

    this.collection = new ThemeParkList.Collections.Parks();
    this.collection.fetch({
      remove: false,
      data: { page: 1, filters: filters },
    });

    this.updateParks();
  },

  fetchIfAtBottom: function () {
    var page = this.collection.page
    if ((window.innerHeight + window.scrollY) >= $(document).height() && 
         page > 0 && page < this.collection.total_pages) {
      this.collection.fetch({
        remove: false,
        data: { page: page + 1, filters: this.filters }
      })
    }
  }
});