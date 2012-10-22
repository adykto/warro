$(document).ready(function() {
	//$(".placeHolder").css("height", $("body").css("height")+"px");
	//var w=0; var h=0;
	/*$('#map img.lazy').each( function(){
		w += $(this).width();
		h += $(this).height();
	});*/

	//$('#map').width( w );
	//$('#map').height( h );

	/*$("#map").css({

	});*/

	var heightBrowser= $(window).height();

	/*$('#map').rmap({
		height : heightBrowser,
		image : {
			src : ''
		},
		nav_ui : {
			autohide : false
		}
	});*/

	var element = $('.map-viewport').viewport();
	var content = element.viewport('content');

	content.draggable({
		containment: 'parent',
		stop: refreshMinimap
	});

	$(".lazy").lazyload( {
		effect       : "fadeIn",
	 	//container: $("#container"),
	 	failure_limit : $(".lazy").length+10
 	});

	//$("div").css("overflow","");

	/*$("img.lazy").each(function() {
		$(this).attr("src", $(this).data("original"));
	});*/

	/*content.scraggable({
		sensitivity: 5,
		containment: 'parent'
	});*/

	//$("#map").mapz();

	$('body').animate({scrollTop: "1px", scrollLeft: "1px"}, 100);
	$('body').animate({scrollTop: "0px", scrollLeft: "0px"}, 100);
	$(window).resize(refreshMinimap);
	refreshMinimap();
});

function refreshMinimap() {
	var mapDiv = $('#map'),
		mapHeight = mapDiv.height(),
		mapWidth = mapDiv.width(),
		mapX = mapDiv.parent().position().left,
		mapY = mapDiv.parent().position().top,
		minimapHeight = $('#minimap').height(),
		minimapWidth = $('#minimap').width(),
		visibleHeight = $('#container').height(),
		visibleWidth = $('#container').width(),
		visorScale = mapWidth / minimapWidth,
		visorHeight = Math.ceil(visibleHeight / visorScale),
		visorWidth = Math.ceil(visibleWidth / visorScale),
		visorX = Math.ceil(minimapWidth - (mapX / visorScale)),
		visorY = Math.ceil(minimapHeight - (mapY / visorScale)),
		visorDiv = $('#minimapVisor');

	visorDiv.height(visorHeight);
	visorDiv.width(visorWidth);

	visorDiv.css({
		'left': (visorX - visorWidth) + 'px',
		'top': (visorY - visorHeight) + 'px',
	});
}