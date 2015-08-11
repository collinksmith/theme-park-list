ThemeParkList.Views.Error = Backbone.View.extend({
  className: "alert alert-danger",
  attributes: {"role": "alert"},

  initialize: function (options) {
    this.error = options.error
  }

  render: function () {
    this.$el.html(this.error);
    return this;
  }
});