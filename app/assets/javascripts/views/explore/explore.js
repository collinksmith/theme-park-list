ThemeParkList.Views.Explore = Backbone.CompositeView.extend(
  _.extend({}, ThemeParkList.Mixins.Filterable {
    template: JST["explore/explore"],

    events: {
      "click #btn-filter": "applyFilter"
    },

    initialize: function (options) {
      this.Basecollection = options.collection;
      this.filteredCollection = this.baseCollection.filtered(
        function () { return true ;});

      this.parksIndexView = new ThemeParkList.Views.ParksIndex({ 
        collection: this.filteredCollection 
      });
      this.addSubview(".parks-index", this.parksIndexView);

      var filterView = new ThemeParkList.Views.ParksFilters();
      this.addSubview(".filters", filterView);
    },

    applyFilter: function (event) {
      console.log("found click");
      // var filterFunction = this.computeFilter(event); // filtering logic goes here
      // this.filteredFunction.teardown();
      // this.filteredCollection = this.baseCollection.filtered(filterFunction);
      // this.removeSubview(".parks-index", this.parksIndexView);
      // this.parksIndexView = new ThemeParkList.Views.ParksIndex({ 
      //   collection: this.filteredCollection 
      // });
      // this.addSubview(".parks-index", this.parksIndexView);
      // this.render();
    },

    computeFilter: function () {

    },

    render: function () {
      this.$el.html(this.template());
      this.attachSubviews();
      return this;
    },

    swapSubviews: function (newSubview, oldSubview) {
      this.removeSubview(".parks-index", oldSubview);
      this.addSubview(".parks-index", newSubview);
    }
  })
);