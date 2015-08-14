ThemeParkList.Models.Park = Backbone.Model.extend({
  urlRoot: "/api/parks",

  parse: function (response) {
    if (response.costs) {
      this.costs().set(response.costs);
      delete response.costs;
    }
    if (response.weather) {
      this.weather().set(response.weather);
      delete response.weather;
    }
    return response;
  },

  costs: function () {
    if (!this._costs) {
      this._costs = new ThemeParkList.Collections.Costs([], { park: this });
    }
    return this._costs;
  },

  weather: function () {
    if (!this._weather) {
      this._weather = new ThemeParkList.Collections.
                               WeatherData([], { park: this });
    }
    return this._weather;
  }
});