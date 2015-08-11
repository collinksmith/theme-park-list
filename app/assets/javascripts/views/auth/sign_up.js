ThemeParkList.Views.SignUp = Backbone.View.extend({
  template: JST["auth/auth_form"],

  render: function () {
    this.$el.html(this.template({ new_form: true }));
    return this;
  }
});