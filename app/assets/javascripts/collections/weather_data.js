ThemeParkList.Collections.WeatherData = Backbone.Collection.extend({
  url: "/api/weather_data",
  model: ThemeParkList.Models.WeatherDatum
});