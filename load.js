// Requires config.js

Screen = {};
Screen.bounds = new google.maps.LatLngBounds();
Screen.markers = {};
Screen.stays = {};
Screen.infoboxes = [];

var DirectionsService = new google.maps.DirectionsService();
var DirectionsDisplay = function(color) {
   return new google.maps.DirectionsRenderer(Config.mixin({
      polylineOptions: {
         strokeColor: color,
         strokeOpacity: 0.75
      },
   }, Config.directionsOptions));
};

function attachMarker(map, position, color) {
   var iconOptions = Config.markIconOptions;
   iconOptions['fillColor'] = color;
   var marker = new google.maps.Marker({
      position: position,
      icon: Config.markIconOptions,
      map: map
   });

   return marker;
}

function attachItinerary(name, map) {
   var itinerary = Routes[name];
   var color = Config.color(name);
   var res = [];

   itinerary.forEach(function(stop) {
      if (!Screen.markers[stop.name]) {
         var marker = attachMarker(map, Routes.location[stop.name], color);
         google.maps.event.addListener(marker, 'click', Config.partial(showInfobox, map, stop.name));
         Screen.bounds.extend(marker.getPosition());
         Screen.markers[stop.name] = marker;
         res.push(marker);
      }
      Screen.stays[stop.name] = Screen.stays[stop.name] || {};
      Screen.stays[stop.name][name] = stop.arrive + ' - ' + stop.depart;
   });

   res.push(new google.maps.Polyline(Config.mixin({
      path: itinerary.map(function(stop) { return Routes.location[stop.name]; }),
      strokeColor: color,
      map: map
   }, Config.polylineOptions)));
   return res;
}

function showInfobox(map, city) {
   Screen.infoboxes.forEach(function(box) { box.close(); });
   var infowindow = new google.maps.InfoWindow({
      content: Config.infobox(city, Screen.stays[city])
   });
   Screen.infoboxes.push(infowindow);
   infowindow.open(map, Screen.markers[city]);
}

function initialize() {
   var map = new google.maps.Map(document.getElementById('map-canvas'), Config.mapOptions);
   attachItinerary('chris', map);
   attachItinerary('mom', map);
   map.fitBounds(Screen.bounds);
}
google.maps.event.addDomListener(window, 'load', initialize);
