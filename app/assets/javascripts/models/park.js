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
    if (response.reviews) {
      this.reviews().set(response.reviews);
      delete response.reviews;
    }
    return response;
  },

  costs: function () {
    if (!this._costs) {
      this._costs = new ThemeParkList.Collections.Costs([], { park: this });
    }
    return this._costs;
  },

  reviews: function () {
    if (!this._reviews) {
      this._reviews = new ThemeParkList.Collections.Reviews([], { park: this });
    }
    return this._reviews;
  },

  weather: function (weather_data) {
    if (weather_data) {
      this._weather = { score: weather_data.score,
                        high: weather_data.high,
                        low:  weather_data.low,
                        precip: weather_data.precip.toFixed(2) }
    }
    return this._weather;
  },

  toC: function (temp) {
    return (temp - 32) * (5 / 9)
  },

  temp: function (unit, highOrLow) {
    if (highOrLow === "low") {
      if (unit === "°C") {
        return Math.round(this.toC(this.weather().low)) + "°C";
      } else {
        return Math.round(this.weather().low) + "°F";
      }
    } else {
      if (unit === "°C") {
        return Math.round(this.toC(this.weather().high)) + "°C";
      } else {
        return Math.round(this.weather().high) + "°F";
      }
    }
  },

  scoreClass: function (score) {
    if (score >= 75) {
      return "progress-success"
    } else if (score >= 50) {
      return "progress-warning"
    } else {
      return "progress-danger"
    }
  }
});