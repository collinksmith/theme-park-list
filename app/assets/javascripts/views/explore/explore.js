ThemeParkList.Views.Explore = Backbone.CompositeView.extend({
  template: JST["explore/explore"],

  events: {
    "click #btn-filter": "applyFilter"
  },

  initialize: function (options) {
    var filterView = new ThemeParkList.Views.ParksFilters();
    this.addSubview(".filters", filterView);
    
    this.baseCollection = options.collection;
    this.listenTo(this.baseCollection, "sync", this.setFilteredCollection);
  },

  setFilteredCollection: function () {
    this.filteredCollection = this.baseCollection.filtered(
      function () { return true ;});
    this.parksIndexView = new ThemeParkList.Views.ParksIndex({ 
      collection: this.filteredCollection 
    });
    this.swapParksIndexView(this.parksIndexView);
  },

  applyFilter: function (event) {
    var filterFunction = this.computeFilter(event); // filtering logic goes here
    this.filteredFunction.teardown();
    this.filteredCollection = this.baseCollection.filtered(filterFunction);
    this.removeSubview(".parks-index", this.parksIndexView);
    this.parksIndexView = new ThemeParkList.Views.ParksIndex({ 
      collection: this.filteredCollection 
    });
    this.addSubview(".parks-index", this.parksIndexView);
    this.render();
  },

  computeFilter: function () {

  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  swapParksIndexView: function (newSubview) {
    this.removeSubview(".parks-index", this.parksIndexView);
    this.addSubview(".parks-index", newSubview);
  }
});