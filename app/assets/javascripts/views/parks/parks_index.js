ThemeParkList.Views.ParksIndex = Backbone.CompositeView.extend(
  _.extend({}, ThemeParkList.Mixins.Filterable, {
    template: JST["parks/parks_index"],

    initialize: function () {
      this.baseCollection = options.collection;
      this.filteredCollection = this.baseCollection.filtered(
        function () { return true ;});

      this.baseCollection.each(this.addParkView.bind(this));

      this.listenTo(this.collection, "add", this.addParkView);
      this.listenTo(this.collection, "sync", this.render);
      $(window).scroll(this.fetchIfAtBottom.bind(this));
    },

    render: function () {
      this.$el.html(this.template({ parks: this.collection }));
      this.attachSubviews();
      return this;
    },

    applyFilter: function() {
      var filterFunction = this.computeFilterFunction(); // filtering logic goes here
      this.filteredFunction.teardown();
      this.filteredCollection = this.baseCollection.filtered(filterFunction);
      this.render();
    },

    addParkView: function (park) {
      var parkView = new ThemeParkList.Views.ParksIndexItem({ model: park });
      this.addSubview(".parks", parkView);
    },

    fetchIfAtBottom: function () {
      var page = this.collection.page;
      if ((window.innerHeight + window.scrollY) >= $(document).height() && 
           page > 0 && page < this.collection.total_pages) {
        this.collection.fetch({
          remove: false,
          data: { page: page + 1 }
        });
      }
    }
  })
);