ThemeParkList.Views.ParksIndexItem = Backbone.View.extend({
  template: JST['parks/parks_index_item'],
  className: "parks-index-item",

  initialize: function () {
    // this.$el.css("background-image",
    //           "url('/assets/park_images/" + this.model.escape('image_url') + "')")
  },

  render: function () {
    this.$el.html(this.template({ park: this.model }));
    return this;
  }
});