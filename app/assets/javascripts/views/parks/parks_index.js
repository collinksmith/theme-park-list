ThemeParkList.Views.ParksIndex = Backbone.CompositeView.extend({
  template: JST["parks/parks_index"],

  className = "parks",

  initialize: function () {
    this.collection.each(addParkView.bind(this));
    this.listenTo(this.collection, "add", addParkView);
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ parks: this.collection }));
    this.attachSubviews();
    return this;
  },

  addParkView: function (park) {
    var parkView = new ThemeParkList.Views.ParksIndexItem({ model: park });
    this.addSubview(".parks", parkView);
  }
});