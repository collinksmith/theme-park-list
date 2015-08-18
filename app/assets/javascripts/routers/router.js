ThemeParkList.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "explore"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.collection = options.collection;
    var authView = new ThemeParkList.Views.Auth();
    this.explore();
  },

  explore: function () {
    this.collection.fetch({
      remove: false,
      data: { page: 1 }
    })
    var exploreView = new ThemeParkList.Views.Explore({ 
      collection: this.collection,
      CURRENT_USER: ThemeParkList.CURRENT_USER
    });

    this._swapView(exploreView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});