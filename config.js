Config = {};

Config.mapOptions = {
   panControl: false,
   mapTypeControl: false,
   streetViewControl: false,
   zoom: 5,
   center: new google.maps.LatLng(49.815424, 11.338601),
   styles:  [
      {
         elementType: "labels.text.stroke",
         stylers: [
           { visibility: 'off', weight: 0, color: "#242424" }
         ]
      },{
         elementType: "labels.text.fill",
         stylers: [
           { color: "#FFFFFF" }
         ]
      },{
         featureType: "road",
         elementType: "geometry",
         stylers: [
            { visibility: "off" }
         ]
      },{
         featureType: "landscape",
         elementType: "geometry",
         stylers: [
            { color: "#5D5D5D" }
         ]
      },{
         featureType: "road",
         elementType: "geometry",
         stylers: [
            { visibility: "off" }
         ]
      },{
         featureType: "road",
         elementType: "labels",
         stylers: [
            { visibility: "off" }
         ]
      },{
         featureType: "poi",
         stylers: [
            { visibility: "off" }
         ]
      },{
         featureType: "water",
         elementType: "geometry",
         stylers: [
            { color: "#242424" }
         ]
      }
      ,{
         featureType: "transit",
         stylers: [
            { visibility: "off" }
         ]
      }
   ]
};

Config.markIconOptions = {
   path: 'M24 4c-7.73 0-14 6.27-14 14 0 10.5 14 26 14 26s14-15.5 14-26c0-7.73-6.27-14-14-14zm0 19c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z',
   scale: 0.6,
   strokeOpacity: 0,
   strokeWeight: 1,
   fillOpacity: 0.75,
   anchor: new google.maps.Point(24, 48)
};

Config.directionsOptions = {
   icons: [],
   suppressInfoWindows: true,
   suppressMarkers: true,
   suppressBicyclingLayer: true,
   hideRouteList: true
};

Config.polylineOptions = {
   geodesic: true,
   strokeOpacity: 0.5,
   strokeWeight: 3,
   icons: [{
      icon: { path: google.maps.SymbolPath.FORWARD_OPEN_ARROW },
      repeat: '200px',
      offset: '190px'
   }],
};

Config.infobox = function(title, stays) {
   function elt(tag, content, className) {
      var element = document.createElement(tag);
      if (className)
         element.classList.add(className);
      if (content)
         element.innerHTML = content;
      return element;
   }

   var container = elt('div', '', 'infobox');
   container.appendChild(elt('h1', title));

   for (var name in stays) {
      var subheader = elt('h2', '', name);
      subheader.appendChild(elt('span', name));
      subheader.appendChild(elt('span', stays[name]));
      container.appendChild(subheader);
   }
 
   var serializer = elt('div');
   serializer.appendChild(container);
   return serializer.innerHTML;
}

Config.color = function(key) {
   return {
      chris: '#72B3CC',
      mom: '#C75646'
   }[key] || '#FFFFFF';
}

Config.mixin = function(a, b) {
   a = a || {};
   b = b || {};

   var res = {};
   for (var key in a)
      res[key] = a[key];
   for (var key in b)
      res[key] = b[key];
   return res;
}

Config.partial = function(fn, var_args) {
   var args = Array.prototype.slice.call(arguments, 1);
   return function() {
      var newArgs = args.slice();
      newArgs.push.apply(newArgs, arguments);
      return fn.apply(this, newArgs);
   };
};
