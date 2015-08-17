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
    var filterFunction = this.computeFilter(); // filtering logic goes here
    this.filteredCollection.teardown();
    this.filteredCollection = this.baseCollection.filtered(filterFunction);
    var newParksIndexView = new ThemeParkList.Views.ParksIndex({ 
      collection: this.filteredCollection 
    });
    // debugger;
    this.swapParksIndexView(newParksIndexView)
    this.render();
  },

  computeFilter: function () {
    return function (park) {
      park.isCool();
    }

    // var filters = $(".selected-filter");
    // return this.evaluateFilters(filters);
  },

  evaluateFilters: function (filters) {
    if (filters.length <= 0) { return true; }
    var filter = filters.splice(0, 1);
    var func = $(filter).data("func");
    return this.executeFunctionByName(func) && 
           this.evaluateFilters(filters);
  },

  executeFunctionByName: function (functionName) {
    var args = Array.prototype.slice.call(arguments, 1);
    context = this.collection.model;
    debugger;
    return context[functionName].apply(context, args);
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