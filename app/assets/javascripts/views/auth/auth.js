ThemeParkList.Views.Auth = Backbone.View.extend({
  el: 'body',

  events: {
    "click #sign-up": "showSignUp",
    "click .log-in": "showLogIn",
    "click #guest-log-in": "guestLogIn"
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
    this.logInView = new ThemeParkList.Views.AuthModal({ new_user: false });
    var modal = new Backbone.BootstrapModal({
      content: this.logInView,
      title: "Log In",
      okText: "Log In!",
      okFocus: false,
      cancelText: false,
      animate: true,
      enterTriggersOk: true,
      okCloses: false
    }).open(this.logIn.bind(this));
  },

  logIn: function () {
    var userData = this.logInView.$el.serializeJSON();
    newSession = new ThemeParkList.Models.Session();
    
    newSession.save(userData, {
      success: function () {
        window.location.reload(true);
      },
      error: function (model, response) {
        var errors = _(response.responseJSON);
        errors.each(function (error) {
          this.logInView.addError(error);
        }.bind(this));
      }
    });
  },

  guestLogIn: function (event) {
    event.preventDefault();
    this.fillInForms();
  },

  fillInForms: function () {
    var eid = setInterval(fillInEmail, 40);

    var view = this
    var email = "guest@themeparklist.info".split('');
    var emailIdx = 0;
    var $emailInput = $("#user_email");
    function fillInEmail() {
      var letter = email[emailIdx];
      var currentEmail = $emailInput.val();
      $emailInput.val(currentEmail + letter);
      emailIdx++;
      if (emailIdx >= email.length) { 
        clearInterval(eid);
        view.fillInPassword();
      }
    }
  },

  fillInPassword: function () {
    var pid = setInterval(fillInPassword, 40);

    var view = this;
    var password = "guestguest".split('');
    var passwordIdx = 0;
    var $passwordInput = $("#user_password");
    function fillInPassword() {
      var letter = password[passwordIdx];
      var currentPassword = $passwordInput.val();
      $passwordInput.val(currentPassword + letter);
      passwordIdx++;
      if (passwordIdx >= password.length) {
        clearInterval(pid);
        view.logIn();
      }
    }
  }
});