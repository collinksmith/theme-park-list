ThemeParkList.Views.LogIn = Backbone.CompositeView.extend({
  template: JST["auth/auth_form"],
  tagName: "form",

  render: function () {
    this.$el.html(this.template({ new_form: false }));
    this.attachSubviews();
    return this;
  },

  addError: function (error) {
    var errorView = new ThemeParkList.Views.Error({ error: error });
    this.addSubview(".errors", errorView);
  }
});