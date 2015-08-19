ThemeParkList.Views.Map = Backbone.View.extend({
  attributes: {
    id: "map-canvas"
  },

  initialize: function () {
    this._markers = {};
  },

  initMap: function () {
    var mapOptions = {
      center: { lat: 39.5, lng: -98.35 },
      zoom: 4
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
  },
});