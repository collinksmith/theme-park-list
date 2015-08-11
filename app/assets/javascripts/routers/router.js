ThemeParkList.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "explore"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.collection = options.collection;
    var authView = new ThemeParkList.Views.Auth();
  },

  explore: function () {
    var exploreView = new ThemeParkList.Views.Explore({ collection: this.collection });
    this._swapView(exploreView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});