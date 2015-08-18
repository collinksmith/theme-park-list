ThemeParkList.Views.Nav = Backbone.View.extend({
  template: JST["nav"],

  evnts: {
    "click .btn": "search"
  },

  initialize: function (options) {
    this.CURRENT_USER = options.CURRENT_USER;
  },

  render: function () {
    this.$el.html(this.template({ CURRENT_USER: this.CURRENT_USER }));
    return this;
  },

  search: function() {
    console.log("Got to search from nav.js");
    debugger;
  }
});