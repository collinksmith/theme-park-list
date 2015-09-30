ThemeParkList.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "explore",
    "users/:id": "userShow"
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
    });

    this._swapView(exploreView);
  },

  userShow: function (id) {
    var user = new ThemeParkList.Models.User({ id: id });
    var userView = new ThemeParkList.Views.UserShow({ model: user });
    user.fetch();
    this._swapView(userView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});