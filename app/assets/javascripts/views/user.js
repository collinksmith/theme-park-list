ThemeParkList.Views.User = Backbone.CompositeView.extend({
  template: JST["user"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);

    this.navView = new ThemeParkList.Views.Nav({ search: false });
    this.addSubview("#nav", this.navView);
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    this.attachSubviews();
    return this;
  }
});