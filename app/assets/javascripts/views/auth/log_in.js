ThemeParkList.Views.LogIn = Backbone.View.extend({
  template: JST["auth/auth_form"],
  tagName: "form",
  // className: "form-group",

  render: function () {
    this.$el.html(this.template({ new_form: false }));
    return this;
  }
});