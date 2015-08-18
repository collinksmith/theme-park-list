ThemeParkList.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "explore"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$navEl = options.$navEl;
    this.collection = options.collection;
    var authView = new ThemeParkList.Views.Auth();
    this.nav();
    this.explore();
  },

  nav: function () {
    var navView = new ThemeParkList.Views.Nav({ 
      CURRENT_USER: ThemeParkList.CURRENT_USER
    });
    this.$navEl.html(navView.render().$el);
  },

  explore: function () {
    this.collection.fetch({
      remove: false,
      data: { page: 1 }
    })
    var exploreView = new ThemeParkList.Views.
                          Explore({ collection: this.collection });

    this._swapView(exploreView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});