// Requires config.js

var DirectionsService = new google.maps.DirectionsService();
var DirectionsDisplay = function(color) {
   return new google.maps.DirectionsRenderer(Config.mixin({
      polylineOptions: {
         strokeColor: color,
         strokeOpacity: 0.75
      },
      
   }, Config.directionsOptions));
};
var bounds = new google.maps.LatLngBounds();

function attachMarker(map, position, info, color) {
   var iconOptions = Config.markIconOptions;
   iconOptions['fillColor'] = '#9CD9F0';
   var marker = new google.maps.Marker({
      position: position,
      icon: Config.markIconOptions,
      map: map
   });
   var infowindow = new google.maps.InfoWindow({ content: info });
   google.maps.event.addListener(marker, 'click', function() {
     infowindow.open(map, marker);
   });
   return marker;
}

function attachItinerary(itinerary, map, color) {
   var res = [];

   itinerary.forEach(function(stop) {
      var marker = attachMarker(map, Routes.location[stop.name], stop.name, color);
      bounds.extend(marker.getPosition());
      res.push(marker);
   });

   res.push(new google.maps.Polyline(Config.mixin({
      path: itinerary.map(function(stop) { return Routes.location[stop.name]; }),
      strokeColor: color,
      map: map
   }, Config.polylineOptions)));
   return res;
}

function initialize() {
   var map = new google.maps.Map(document.getElementById('map-canvas'), Config.mapOptions);
   attachItinerary(Routes.chris, map, Config.color('chris'));
   attachItinerary(Routes.mom, map, Config.color('mom'));
   map.fitBounds(bounds);
}
google.maps.event.addDomListener(window, 'load', initialize);
