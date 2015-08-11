ThemeParkList.Views.Auth = Backbone.View.extend({
  el: 'body',

  events: {
    "click #sign-up": "showSignUp",
    "click #log-in": "showLogIn",
  },

  showSignUp: function (event) {
    var signUpView = new ThemeParkList.Views.AuthModal({ new_user: true });
    var modal = new Backbone.BootstrapModal({
      content: signUpView,
      title: "Sign Up",
      okText: "Sign Up!",
      okFocus: false,
      cancelText: false,
      animate: true,
      enterTriggersOk: true,
      okCloses: false
    }).open(this.signUp.bind(this, signUpView));
  },

  signUp: function (signUpView) {
    var newUserData = signUpView.$el.serializeJSON();

    if (newUserData["user"]["password"] === newUserData["password-confirmation"]) {
      delete newUserData["password-confirmation"];
      var newUser = new ThemeParkList.Models.User();

      newUser.save(newUserData, {
        success: function () {
          window.location.reload(true);
        },
        error: function (model, response) {
          var errors = _(response.responseJSON);
          errors.each(function (error) {
            signUpView.addError(error);
          });
        }
      });
    } else {
      signUpView.addError("Passwords don't match.");
    }
  },

  showLogIn: function () {
    var logInView = new ThemeParkList.Views.AuthModal({ new_user: false });
    var modal = new Backbone.BootstrapModal({
      content: logInView,
      title: "Log In",
      okText: "Log In!",
      okFocus: false,
      cancelText: false,
      animate: true,
      enterTriggersOk: true,
      okCloses: false
    }).open(this.logIn.bind(this, logInView));
  },

  logIn: function (logInView) {
    var userData = logInView.$el.serializeJSON();
    var newSession = new ThemeParkList.Models.Session();
    
    newSession.save(userData, {
      success: function () {
        window.location.reload(true);
      },
      error: function (model, response) {
        var errors = _(response.responseJSON);
        errors.each(function (error) {
          logInView.addError(error);
        });
      }
    });
  }
});