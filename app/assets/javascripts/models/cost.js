ThemeParkList.Models.Cost = Backbone.Model.extend({
  urlRoot: "/api/costs",

  toS: function () {
    var result = "";
    words = this.escape("cost_type").split("_");
    _.each(words, function (word) {
      result += word[0].toUpperCase() + word.slice(1) + " "
    })
    return result.trim();
  }
});