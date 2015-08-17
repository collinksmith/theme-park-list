ThemeParkList.Views.Explore = Backbone.CompositeView.extend({
  template: JST["explore/explore"],

  events: {
    "click #btn-filter": "filterParks"
  },

  initialize: function () {
    var parksIndexView = new ThemeParkList.Views.
                             ParksIndex({ collection: this.collection });
    this.addSubview(".parks-index", parksIndexView);

    var filterView = new ThemeParkList.Views.ParksFilters();
    this.addSubview(".filters", filterView);
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  filterParks: function () {
    var filters = [];
    $(".selected-filter").each(function (index, filterBtn) {
      filters.push($(filterBtn).text());
    })

    this.collection.fetch({
      remove: false,
      data: { page: 1, filters: filters }
    })
  }
});