ThemeParkList.Models.Park = Backbone.Model.extend({
  urlRoot: "/api/parks",

  parse: function (response) {
    if (response.costs) {
      this.costs().set(response.costs);
      delete response.costs;
    }
    if (response.weather) {
      this.weather(response.weather);
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

  weather: function (weather_data) {
    if (weather_data) {
      this._weather = { score: weather_data.score ,
                        high: weather_data.high,
                        low:  weather_data.low,
                        precip: weather_data.precip }
    }
    return this._weather;
  },

  scoreClass: function (score) {
    if (score >= 75) {
      return "progress-success"
    } else if (score >= 50) {
      return "progress-warning"
    } else {
      return "progress-danger"
    }
  },

  isCool: function () {
    return this.weather().avg_high < 60;
  },

  isWarm: function () {
    avg_high = this.weather().avg_high;
    return avg_high >= 60 && avg_high < 85;
  },

  isHot: function () {
    return this.weather().avg_high >= 85;
  }
});