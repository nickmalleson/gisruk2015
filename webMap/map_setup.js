 function initialize()	{
	
	var map = L.map('map').setView([53.80,-1.54], 13);
	
	var mapBoxTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v3/roldroyd.ieh6m4hl/{z}/{x}/{y}.png', {
		attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
	}).addTo(map);
	
	//L.mapbox.accessToken = 'pk.eyJ1Ijoicm9sZHJveWQiLCJhIjoicmM1RUhEayJ9._RpsFhSLzYNYGNhIF3PZEw';
	
	var attractions = L.geoJson(geojsonFeature, {
		onEachFeature: function (feature, layer) {
			var popupContent = 
			"<h2>" + feature.properties.Name +"</h2>"
			+"<p>"+ feature.properties.Description +"</p>"; 
			layer.bindPopup(popupContent);
		},
		
		pointToLayer: setIcon
		
	}).addTo(map); 
}

function setIcon(feature, latlng)	{
	var hotelIcon = L.icon({ 
		iconUrl: 'hotel.png',
		iconSize: [30, 30], 
		iconAnchor: [1, 1]
	});
	
	var buildingIcon = L.icon({ 
		iconUrl: 'building.png',
		iconSize: [35, 35], 
		iconAnchor: [1, 1]
	});
	
	var foodIcon = L.icon({ 
		iconUrl: 'food.png',
		iconSize: [35, 35],  
		iconAnchor: [1, 1]
	});
	
	var pubIcon = L.icon({ 
		iconUrl: 'pub.png',
		iconSize: [30, 30], 
		iconAnchor: [1, 1]
	});
	
	var attractionIcon = L.icon({ 
		iconUrl: 'attraction.png',
		iconSize: [30, 30], 
		iconAnchor: [1, 1]	
	});
	
	var shoppingIcon = L.icon({ 
		iconUrl: 'shopping.png',
		iconSize: [30, 30], 
		iconAnchor: [1, 1]
	});
	
	switch (feature.properties.Category)	{
		case 'Attraction' : 		_icon = L.marker (latlng, {icon: attractionIcon}); break;
		case 'Restaurant' : 		_icon = L.marker (latlng, {icon: foodIcon}); break;
		case 'Shopping' : 			_icon = L.marker (latlng, {icon: shoppingIcon}); break;
		case 'Hotel' :				_icon = L.marker (latlng, {icon: hotelIcon}); break;
		case 'University Building':	_icon = L.marker (latlng, {icon: buildingIcon}); break
		case 'Pub' : 				_icon = L.marker (latlng, {icon: pubIcon}); 
	}
	
	return _icon; 
}	

