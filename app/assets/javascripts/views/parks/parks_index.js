ThemeParkList.Views.ParksIndex = Backbone.CompositeView.extend({
  template: JST["parks/parks_index"],

  initialize: function () {
    this.collection.each(this.addParkView.bind(this));
    this.listenTo(this.collection, "add", this.addParkView);
    this.listenTo(this.collection, "sync", this.render);
    $(window).scroll(this.fetchIfAtBottom.bind(this));
  },

  render: function () {
    this.$el.html(this.template({ parks: this.collection }));
    this.attachSubviews();
    return this;
  },

  addParkView: function (park) {
    var parkView = new ThemeParkList.Views.ParksIndexItem({ model: park });
    this.addSubview(".parks", parkView);
  },

  fetchIfAtBottom: function () {
    if ((window.innerHeight + window.scrollY) >= $(document).height()) {
      this.collection.fetch({
        remove: false,
        data: { page: this.collection.page + 1 }
      })
    }
  }
});