ThemeParkList.Views.Auth = Backbone.View.extend({
  el: 'body',

  events: {
    "click #sign-up": "showSignUp",
    "click #log-in": "showLogIn"
  },

  initialize: function () {

  },

  showSignUp: function (event) {
    var view = new ThemeParkList.Views.SignUp();
    var modal = new Backbone.BootstrapModal({
      content: view,
      title: "Sign Up",
    }).open();
  },

  showLogIn: function () {
    var view = new ThemeParkList.Views.LogIn();
    var modal = new Backbone.BootstrapModal({
      content: view,
      title: "Log In"
    }).open();
  }
});