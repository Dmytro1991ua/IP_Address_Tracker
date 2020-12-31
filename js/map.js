let map, marker;

function generateMap({ lat, lng }) {
   //reset map when it's to be refreshed for quiried ipAddress (before initialization)
   if (map) {
      map.remove();
      map = undefined;
      document.getElementById("map").innerHTML = "";
   }

   // default map API options
   const mapOptions = {
      attributionControl: false,
      zoomControl: false,
      dragging: true,
      doubleClickZoom: true,
      scrollWheelZoom: true,
   }

   // generate a new interactive map
   map = L.map('map', mapOptions).setView([lat, lng], 17);
   const attribution = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
   const tileUrl = 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=zngEoX89owvryGir697G'

   const tiles = L.tileLayer(tileUrl, { attribution });
   tiles.addTo(map);

   // customize a location icon to a map
   const locationIcon = L.icon({
      iconUrl: '../img/location.svg',
      iconSize: [50, 50],
      iconAnchor: [19, 45],
   });

   marker = L.marker([lat, lng], { icon: locationIcon }).addTo(map);
};

export default generateMap;