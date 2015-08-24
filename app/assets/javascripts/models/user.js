ThemeParkList.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  parse: function (response) {
    if (response.reviews) {
      this.reviews().set(response.reviews)
      delete response.reviews;
    }
    if (response.parks) {
      this.parks().set(response.parks);
      delete response.parks;
    }
    return response;
  },

  reviews: function () {
    if (!this._reviews) {
      this._reviews = new ThemeParkList.Collections.Reviews([], { user: this });
    }
    return this._reviews;
  },

  parks: function () {
    if (!this._parks) {
      this._parks = new ThemeParkList.Collections.Parks([], { user: this });
    }
    return this._parks;
  }
})