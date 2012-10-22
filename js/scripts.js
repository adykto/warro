var initialX = 0, initialY = 0, moving = false;

window.onload = function() {
	var container = document.getElementById('container')
	container.style.display = 'block';
	//container.addEventListener('mousedown', mapClick, false);
	//window.addEventListener('mousemove', mapMove, true);
	//window.addEventListener('mouseup', mapRelease, false);
};

function mapClick(e) {
	var map = document.getElementById('map');
	initialX = e.clientX - map.offsetLeft;
	initialY = e.clientY - map.offsetTop;
	moving = true;
}

function mapRelease() {
	document.getElementById('map').style.cursor = 'crosshair';
	moving = false;
}

function mapMove(e){
	if(moving) {
		var map = document.getElementById('map');
		map.style.cursor = 'move';
		map.style.top = (e.clientY - initialY) + 'px';
		map.style.left = (e.clientX - initialX) + 'px';
	}
}