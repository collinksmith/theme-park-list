ThemeParkList.Views.SignUp = Backbone.View.extend({
  template: JST["auth/auth_form"],
  tagName: "form",
  className: "form-group",

  events: {
    "click .ok": "signUp"
  },

  render: function () {
    this.$el.html(this.template({ new_form: true }));
    return this;
  },

  signUp: function (event) {
    event.preventDefault();
    console.log('test');
  }
});