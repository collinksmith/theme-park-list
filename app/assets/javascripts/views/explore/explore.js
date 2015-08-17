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
    
    this.collection = new ThemeParkList.Collections.Parks();
    this.collection.fetch({
      remove: false,
      data: { page: 1, filters: filters },
    });

    this.updateParks();
  }
});