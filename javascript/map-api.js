var map, icones, locais;
var natal = {lat: -5.8269855, lng: -35.2087077};

function initMap() {
	var mapOptions = {
	    center: natal,
	    zoom: 12,
	    mapTypeId: google.maps.MapTypeId.ROADMAP,
	    streetViewControl: false,
	    mapTypeControl: false,
	    styles: [{
            featureType: 'poi',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'transit',
            stylers: [{visibility: 'off'}]
          }]
	}
	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	setBusca();
	icones();
	locais();
	criarMarcadores();
}

function setBusca(){
	var searchBox = new google.maps.places.SearchBox(document.getElementById('busca'));
       
    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
}

function icones(){
	var iconBase = 'imagens/';
    icones = {
        aluguel: {
            icon: iconBase + 'aluguel.png'
        },
        venda: {
           	icon: iconBase + 'venda.png'
        }
   	};
}

function locais(){
	locais = [
        {
     	    position: new google.maps.LatLng(-5.8269855,-35.2087077),
         	type: 'aluguel',
         	title: 'aluguel',
         	texto: '<b>imóvel</b><p>em boas condições...</p>'
        },{
            position: new google.maps.LatLng(-5.8369855,-35.2027077),
            type: 'aluguel',
            title: 'aluguel',
            texto: '<b>imóvel</b><p>em boas condições...</p>'
        }, {
            position: new google.maps.LatLng(-5.8469855,-35.2487077),
            type: 'venda',
            title: 'venda',
            texto: '<b>imóvel</b><p>em boas condições...</p>'
        }, {
            position: new google.maps.LatLng(-5.8469855,-35.2087077),
            type: 'venda',
            title: 'venda',
            texto: '<b>imóvel</b><p>em boas condições...</p>'
        }
    ];
}

function criarMarcadores(){
	locais.forEach(function(local) {
        var marker = new google.maps.Marker({
            position: local.position,
            icon: icones[local.type].icon,
            title: local.title,
            map: map
        });
        var infowindow = new google.maps.InfoWindow({
          	content: local.texto
        });
        marker.addListener('click', function() {
          	infowindow.open(map, marker);
        });
    });
}