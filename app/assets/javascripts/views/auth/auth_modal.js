ThemeParkList.Views.AuthModal = Backbone.CompositeView.extend({
  template: JST["auth/auth_form"],
  tagName: "form",

  initialize: function (options) {
    this.new_user = options.new_user;
  },

  render: function () {
    this.$el.html(this.template({ new_user: this.new_user }));
    this.attachSubviews();
    return this;
  },

  addError: function (error) {
    var errorView = new ThemeParkList.Views.Error({ error: error });
    this.addSubview(".errors", errorView);
  }
});