ThemeParkList.Views.Map = Backbone.View.extend({
  attributes: {
    id: "map-canvas"
  },

  initialize: function () {
    this._markers = {};
    this.styles = [{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#71ABC3"},{"saturation":-10},{"lightness":-21},{"visibility":"simplified"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"hue":"#7DC45C"},{"saturation":37},{"lightness":-41},{"visibility":"simplified"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#C3E0B0"},{"saturation":23},{"lightness":-12},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#A19FA0"},{"saturation":-98},{"lightness":-20},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#FFFFFF"},{"saturation":-100},{"lightness":100},{"visibility":"simplified"}]}]
  },

  initMap: function () {
    var mapOptions = {
      center: { lat: 39.5, lng: -98.35 },
      zoom: 4,
      panControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL
      },
      styles: this.styles
    };

    this._map = new google.maps.Map(this.el, mapOptions);
    this.collection.each(this.addMarker.bind(this));
  },

  addMarker: function (listing) {
    if (this._markers[listing.id]) { return; }
    var view = this;

    var marker = new google.maps.Marker({
      position: { lat: listing.get('latitude'), lng: listing.get('longitude') },
      map: this._map,
      title: listing.get('name')
    });

    google.maps.event.addListener(marker, 'click', function (event) {
      view.addParkShowView(event, marker, listing);
    });

    this._markers[listing.id] = marker;
  },

  addParkShowView: function (event, marker, park) {
    var parkShowView = new ThemeParkList.Views.ParkShow({ model: park });
    $("body").append(parkShowView.render().$el);
  }
});