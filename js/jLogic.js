var element = $('.map-viewport').viewport(),
	content = element.viewport('content'),
	containerDiv = $('#container'),
	mapDiv = $('#map'),
	mapHeight = mapDiv.height(),
	mapWidth = mapDiv.width(),
	minimapDiv = $('#minimap'),
	minimapHeight = minimapDiv.height(),
	minimapWidth = minimapDiv.width(),
	visibleHeight = $('#container').height(),
	visibleWidth = $('#container').width(),
	visorDiv = $('#minimapVisor'),
	visorScale = parseInt(mapWidth / minimapWidth),
	dragTimer = null;

$(document).ready(function() {
	$('#toolwindow').draggable({
		containment: 'parent'
	});

	content.draggable({
		containment: 'parent',
		drag: visorDrag
	});

	visorDiv.draggable({
		containment: 'parent',
		drag: visorDrag
	});

	$("#map img").lazyload( {
		effect       : "fadeIn",
		failure_limit : $("#map img").length+10
	});

	minimapDiv.on('click', mapClicked);

	$('#rollupMinimap').on('click', function(){
		minimapDiv.slideToggle(1000);
		visorDiv.fadeToggle(500);
	});

	$('#rollupMenu').on('click', function(){
		$('#menu').slideToggle(1000);
	});

	$('#toolwindow').css('width', minimapDiv.width());
	$('#menu').slideToggle(2000);

	syncMaps();
	initTouchEvents();
	//$(window).resize(refreshMinimap);
});

function syncMaps() {
	refreshMinimap();
	$(window).resize();
}

function visorDrag(e) {
	var x = mapWidth - (this.offsetLeft * visorScale) - visibleWidth,
		y = mapHeight -(this.offsetTop * visorScale) - visibleHeight;

	if(dragTimer != null) {
		clearTimeout(dragTimer);
	}

	dragTimer = setTimeout(function(){$(window).resize();}, 700);

	if(x < 0) {
		x = 0;
	} else if(x > (mapWidth - visibleWidth)) {
		x = mapWidth - visibleWidth;
	}

	if(y < 0) {
		y = 0;
	} else if(y > (mapHeight - visibleHeight)) {
		y = mapHeight - visibleHeight;
	}

	mapDiv.parent().css({
		'left': x + 'px',
		'top': y + 'px',
	});

	refreshMinimap();

	return true;
}

function mapClicked(e) {
	var x = mapWidth - ((e.pageX - $(this).parent().position().left) * visorScale) - (visibleWidth / 2),
		y = mapHeight - ((e.pageY - $(this).parent().position().top) * visorScale) - (visibleHeight / 2);


	if(x < (visibleWidth / 2)) {
		x = 0;
	} else if(x > (mapWidth - visibleWidth)) {
		x = mapWidth - visibleWidth;
	}

	if(y < (visibleHeight / 2)) {
		y = 0;
	} else if(y > (mapHeight - visibleHeight)) {
		y = mapHeight - visibleHeight;
	}

	console.log(x, y);

	mapDiv.parent().css({
		'left': x + 'px',
		'top': y + 'px',
	});

	syncMaps();
}

function refreshMinimap() {
	var mapX = mapDiv.parent().position().left,
		mapY = mapDiv.parent().position().top,
		visorHeight = Math.ceil(visibleHeight / visorScale),
		visorWidth = Math.ceil(visibleWidth / visorScale),
		visorX = Math.ceil(minimapWidth - (mapX / visorScale)),
		visorY = Math.ceil(minimapHeight - (mapY / visorScale));

	visorDiv.height(visorHeight);
	visorDiv.width(visorWidth);

	visorDiv.css({
		'left': (visorX - visorWidth) + 'px',
		'top': (visorY - visorHeight) + 'px',
	});
}

function touchHandler(event)
{
	var touches = event.changedTouches,

	first = touches[0],
	type = "";

	switch(event.type)
	{
	case "touchstart": type = "mousedown"; break;
	case "touchmove":  type="mousemove"; break;
	case "touchend":   type="mouseup"; break;
	default: return;
	}

	var simulatedEvent = document.createEvent("MouseEvent");

	simulatedEvent.initMouseEvent(
		type, true, true, window, 1, first.screenX, first.screenY,
		first.clientX, first.clientY, false, false, false, false, 0, null
	);

	first.target.dispatchEvent(simulatedEvent);
	event.preventDefault();
}

function initTouchEvents()
{
	if (Modernizr.touch){
		var links = document.getElementsByTagName("a");

		for (var i=0; i < links.length; i++) {
			var link = links[i];

			if ( link.href !== undefined && link.href !== '') {
				link.addEventListener("click", function(e) {
					e.preventDefault();
				});

				link.addEventListener("touchend", function() {
					document.location = this.href;
				});
			}
		}
	}

	document.addEventListener("touchstart", touchHandler, true);
	document.addEventListener("touchmove", touchHandler, true);
	document.addEventListener("touchend", touchHandler, true);
	document.addEventListener("touchcancel", touchHandler, true);
}