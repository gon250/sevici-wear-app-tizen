function Utils(){
	
}

Utils.prototype.getDistanceFromLatLonInKm = 
	function (lat1,lon1,lat2,lon2) {
	  var R = 6371; // Radius of the earth in km
	  var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
	  var dLon = this.deg2rad(lon2-lon1); 
	  var a = 
	    Math.sin(dLat/2) * Math.sin(dLat/2) +
	    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
	    Math.sin(dLon/2) * Math.sin(dLon/2)
	    ; 
	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	  var d = R * c; // Distance in km
	  return d;
	};

Utils.prototype.deg2rad = function (deg) {
  return deg * (Math.PI/180);
}

Utils.prototype.getData = function (popup) {
	$('.loader').show();
	$.ajax({
		method: "GET",
		url: "http://api.citybik.es/v2/networks/sevici",
		dataType : "json",
		success : function(data) {
			if (data.network.stations) {
				var stations = data.network.stations;
				//TODO: Implement long & lat
				$.each(stations, function(i, item) {
					$('ul.ui-listview')
					.append('<li class="extra-info"'
							+ 'data-address="' + stations[i].extra.address + '"' 
							+ 'data-name="' + stations[i].name.substring(4)  + '"'
							+ 'data-freebikes="' + stations[i].free_bikes + '"'
							+ 'data-slots="' + stations[i].extra.slots + '"' 
							+ 'data-status="' + stations[i].extra.status + '"' 
							+ 'data-distance="' + stations[i].extra.status + '"' 
							+'><a href="#">' 
							+ stations[i].name.substring(4) 
							+ '</a>'
							+ '<span class="item-available">Bicis disponibles: ' 
							+ stations[i].free_bikes + '/' 
							+ stations[i].extra.slots
							+'</span>'
							+ '</li>');
				});

				$('.extra-info').on('click', function (){
					$('.ui-popup-header').text($(this).data('name'));
					$('#popup-address').text($(this).data('address'));
					$('#popup-status').text($(this).data('status'));
					$('#popup-bikes').text('Bicis: ' + $(this).data('freebikes'));
					$('#popup-slots').text('Slots: ' + $(this).data('slots'));
					popup.open();
				});

				$('.loader').hide();
			} else {
				$('.loader').hide();
				$('.error-message').show();
			}
		},
		error : function(qXHR, textStatus, errorThrown){
			$('.loader').hide();
			$('.error-message').show();
			console.log("Error " + qXHR.status);
		}
	});
}