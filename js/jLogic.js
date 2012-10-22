$(document).ready(function() {
	var element = $('.map-viewport').viewport();
	var content = element.viewport('content');

	content.draggable({
		containment: 'parent',
		stop: refreshMinimap
	});

	$(".lazy").lazyload( {
		effect       : "fadeIn",
		failure_limit : $(".lazy").length+10
	});

	$('body').animate({scrollTop: "1px", scrollLeft: "1px"}, 100);
	$('body').animate({scrollTop: "0px", scrollLeft: "0px"}, 100);

	$('#minimap').on('click', mapClicked);
	$(window).resize(refreshMinimap);
	refreshMinimap();
});

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
	}, 100);

	$(window).resize();
	refreshMinimap();
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