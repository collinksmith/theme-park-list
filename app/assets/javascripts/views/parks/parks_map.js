ThemeParkList.Views.Map = Backbone.View.extend({
  attributes: {
    id: "map-canvas"
  },

  initMap: function () {
    var mapOptions = {
      center: { lat: 39.5, lng: -98.35 },
      zoom: 4
    };

    this._map = new google.maps.Map(this.el, mapOptions);
  }
});