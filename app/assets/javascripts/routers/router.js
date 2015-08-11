ThemeParkList.Routers.Router = Backbone.Router.extend({
  routes: {
    
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});