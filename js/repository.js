$(window).load(function(){
	//Init App
	var utils = new Utils();
	var popupElement = document.getElementById("popup"),
	popup = tau.widget.Popup(popupElement);
	$('.loader').hide();
	$('#popup-ok').on('click', function() {
		popup.close();
	});
	$('.error-message').hide();
	
	//Manage circle
	document.addEventListener("rotarydetent", function(ev) {
		var direction = ev.detail.direction;
		var activePopup = document.querySelector( '.ui-popup-active' ),
		page = document.getElementsByClassName( 'ui-page-active' )[0],
		pageid = page ? page.id : "";
		if( pageid === "main" && !activePopup ) {
			if (direction == "CW")
			{	
				utils.getData(popup);
			}
			//else if (direction == "CCW"){}
		}else if ( pageid === "main" && activePopup ){
			popup.close();
		}
	});
	
	//Load Data
	utils.getData(popup);
	
});
