ThemeParkList.Views.Nav = Backbone.View.extend({
  template: JST["nav"],
  className: "group",

  initialize: function (options) {
    this.CURRENT_USER = ThemeParkList.CURRENT_USER;
    this.search = options.search;
    this.previousScroll = 0;
    $(window).on("scroll", this.handleScroll.bind(this));
  },

  render: function () {
    this.$el.html(this.template({
      CURRENT_USER: this.CURRENT_USER,
      search: this.search
    }));
    this.setTypeahead();
    return this;
  },


  // Adapted from https://stackoverflow.com/questions/17713389/how-to-hide-show-nav-bar-when-user-scrolls-up-down
  handleScroll: function () {
    var currentScroll = window.scrollY;
    var isDown = currentScroll > this.previousScroll;

    if ( isDown && !$(".navbar").hasClass('scrolled') ){
      // scrolling down, didn't add class yet
      $(".navbar").addClass('scrolled'); // we hide the navbar
    } else if ( !isDown ){
      // scrolling up
      $(".navbar").removeClass('scrolled'); // won't error if no class found
    }

    // always update position
    this.previousScroll = currentScroll;
  },

  setTypeahead: function () {
    this.$(".typeahead").typeahead({
      minLength: 1
    },
    {
      name: "parks",
      source: this.substringMatcher(ThemeParkList.PARK_NAMES)
    });
  },

  substringMatcher: function(strs) {
    return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
    };
  } 
});