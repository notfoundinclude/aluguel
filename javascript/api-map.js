function myMap() {
	var mapOptions = {
	    center: new google.maps.LatLng(-5.8269855,-35.2087077),
	    zoom: 11,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}