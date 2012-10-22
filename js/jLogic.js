$(document).ready(function() {
	var element = $('.map-viewport').viewport();
	var content = element.viewport('content');

	content.draggable({
		containment: 'parent',
		stop: refreshMinimap
	});

	$('#minimapVisor').draggable({
		containment: 'parent',
		stop: visorDrag
	});

	$("#map img").lazyload( {
		effect       : "fadeIn",
		failure_limit : $("#map img").length+10
	});

	$('#minimap').on('click', mapClicked);
	$(window).resize(refreshMinimap);
	refreshMinimap();
});

function visorDrag(e) {
	var mapDiv = $('#map'),
		mapHeight = mapDiv.height(),
		mapWidth = mapDiv.width(),
		minimapHeight = $('#minimap').height(),
		minimapWidth = $('#minimap').width(),
		visorScale = mapWidth / minimapWidth,
		visibleHeight = $('#container').height(),
		visibleWidth = $('#container').width(),
		x = mapWidth - Math.ceil((this.offsetLeft) * visorScale) - visibleWidth,
		y = mapHeight - Math.ceil((this.offsetTop) * visorScale) - visibleHeight;

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

	$(window).resize();
	return true;
}

function mapClicked(e) {
	var mapDiv = $('#map'),
		mapHeight = mapDiv.height(),
		mapWidth = mapDiv.width(),
		minimapHeight = $('#minimap').height(),
		minimapWidth = $('#minimap').width(),
		visorScale = mapWidth / minimapWidth,
		visibleHeight = $('#container').height(),
		visibleWidth = $('#container').width(),
		x = mapWidth - Math.ceil((e.pageX - this.offsetLeft) * visorScale) - (visibleWidth / 2),
		y = mapHeight - Math.ceil((e.pageY - this.offsetTop) * visorScale) - (visibleHeight / 2);

	if(x < (visibleWidth / 2)) {
		x = 0;
		console.log('x >');
	} else if(x > (mapWidth - visibleWidth)) {
		x = mapWidth - visibleWidth;
	}

	if(y < (visibleHeight / 2)) {
		y = 0;
		console.log('y >');
	} else if(y > (mapHeight - visibleHeight)) {
		y = mapHeight - visibleHeight;
	}

	mapDiv.parent().css({
		'left': x + 'px',
		'top': y + 'px',
	});

	$(window).resize();
}

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