<?php
	date_default_timezone_set('Mexico/BajaSur');

	$menu = '';
	$tileWidth = 256;
	$tileHeight = 256;
	$mapsPath = 'maps/';
	$tilesPath = 'tiles/';
	$mapName = isset($_GET['name'])?$_GET['name']:'map';
	$mapFileName = $mapsPath.$mapName.'.jpg';
	$thumbFileName = $mapsPath.$mapName.'_thumb.jpg';
	$lockerFile = $mapsPath.$mapName.'.lck';
	$tileFileTemplate = $tilesPath.$mapName.'_%03d_%03d_%03d.jpg';
	$createTiles = true;
	$mapImage = null;

	// checar si el archivo ya había sido partido en tiles:
	if (file_exists($mapFileName)) {
		$lastLock = null;
		$newLock = md5(date("FdYHis", filemtime($mapFileName)).filesize($mapFileName));

		if(file_exists($lockerFile)) {
			$lastLock = file_get_contents($lockerFile);
		}

		if($lastLock == $newLock) {
			$createTiles = false;
		}
	} else {
		die('Map not found!!! --> '.$mapName);
	}

	list($mapWidth, $mapHeight, $mapType, $mapAttr) = getimagesize($mapFileName);
	$tilesCountX = ceil($mapWidth / $tileWidth);
	$tilesCountY = ceil($mapHeight / $tileHeight);

	if($createTiles) {
		$mapImage = imagecreatefromjpeg($mapFileName);

		$thumbHeight = 24;
		$thumbWidth = floor($mapWidth * ( $thumbHeight / $mapHeight ));

		$thumbImage = imagecreatetruecolor($thumbWidth, $thumbHeight);
		imagecopyresampled($thumbImage, $mapImage, 0, 0, 0, 0, $thumbWidth, $thumbHeight, $mapWidth, $mapHeight);
		imagejpeg($thumbImage, $thumbFileName);
		imagedestroy($thumbImage);
	}

	// crear el menú de mapas
	if ($mapsHandle = opendir($mapsPath)) {
		while (false !== ($entry = readdir($mapsHandle))) {
			if ($entry != "." && $entry != ".." && strpos($entry, '.jpg') > 1 && strpos($entry, '_thumb') < 1) {
				$entry = basename($entry, '.jpg');
				$thumbFileName = $mapsPath.$entry.'_thumb.jpg';
				$menu.= '<li><a href="?name='.$entry.'"><img src="'.$thumbFileName.'" /><span>'.ucwords($entry).'</span></a></li>';
			}
		}
		closedir($mapsHandle);
	}
?><html>
	<head>
		<title>Generador de mapas!</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;">
		
		<script src="http://code.jquery.com/jquery-1.8.2.js"></script>
		<script src="http://code.jquery.com/ui/1.9.0/jquery-ui.js"></script>
		<link href="http://code.jquery.com/ui/1.9.0/themes/base/jquery-ui.css" type="text/css" rel="stylesheet" />				
		<link href="css/style.css" type="text/css" rel="stylesheet" />
		<link href="css/tmcMap.css" type="text/css" rel="stylesheet" />
		
		<script src="js/jquery.lazyload.js"></script>
		<script src="js/jquery.viewport.js"></script>		
		<script src="js/jquery.effects.core.js"></script> 
		<script src="js/jquery.easing.1.3.js"></script>
		<script src="js/jquery.doubletap.js"></script>
		<script src="http://demos.flesler.com/jquery/scrollTo/js/jquery.scrollTo-min.js"></script>
		<script type="text/javascript" src="js/scrollsync.js"></script>
		<script type="text/javascript" src="js/dragscrollable.js"></script>
		<script type="text/javascript" src="js/jquery.tmpl.min.js"></script>
		<script type="text/javascript" src="js/jquery.elastislide.js"></script>
		<!--<script src="js/lazy.js"></script>-->
	</head>
	<body>
		<div id="container">
			<div class="map-viewport">
			
			<div id="map" style="height: <?php echo $tilesCountY * $tileHeight; ?>px; width: <?php echo $tilesCountX * $tileWidth; ?>px;">
			<!--<div div="dragger" ></div>-->
			<?php
				$tileImage = imagecreatetruecolor($tileWidth, $tileHeight);

				for($tileOffsetY = 0; $tileOffsetY < $tilesCountY; $tileOffsetY++) {
					for($tileOffsetX = 0; $tileOffsetX < $tilesCountX; $tileOffsetX++) {
						$tileFileName = sprintf($tileFileTemplate, 1, $tileOffsetX, $tileOffsetY);

						if($createTiles) {
							$mapOffsetX = $tileOffsetX * $tileWidth;
							$mapOffsetY = $tileOffsetY * $tileWidth;
							imagecopy($tileImage, $mapImage, 0, 0, $mapOffsetX, $mapOffsetY, $tileWidth, $tileHeight);
							imagejpeg($tileImage, $tileFileName);
						}
						//echo '<div class="lazy" data-background="', $tileFileName, '" height="', $tileHeight, '" width="', $tileWidth, '" ></div>';
						echo '<img src="css/images/grey.gif" class="lazy"  data-original=', $tileFileName,' width=', $tileWidth,' height=', $tileHeight, ' />';
						//echo '<div class="lazy" style="background: url(', $tileFileName, '); height:', $tileHeight, 'px;width:', $tileWidth, 'px;"></div>';
					}
				}
				imagedestroy($tileImage);
				if($mapImage != null) { imagedestroy($mapImage); }
				if($createTiles) {
					file_put_contents($lockerFile, $newLock);
				}
			?>			 
			</div>
		  </div>
		</div>
		<ul id="menu"><?php echo $menu; ?></ul>
		<!--<script type="text/javascript" src="js/scripts.js"></script>-->
		<script type="text/javascript" src="js/jLogic.js"></script>
	</body>

</html>