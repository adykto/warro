<?php
	date_default_timezone_set('Mexico/BajaSur');

	$menu = '';
	$tileWidth = 256;
	$tileHeight = 256;
	$mapsPath = 'maps/';
	$tilesPath = 'tiles/';
	$mapName = isset($_GET['name'])?$_GET['name']:'map';
	$createTiles = true;
	$minimap = '';

	// crear el menú de mapas
	if ($mapsHandle = opendir($mapsPath)) {
		while (false !== ($entry = readdir($mapsHandle))) {
			if ($entry != "." && $entry != ".." && strpos($entry, '.jpg') > 1 && strpos($entry, 'thumb') < 1) {
				$entry = basename($entry, '.jpg');
				$thumbFileName = $mapsPath.'_thumb_'.$entry.'.jpg';
				$menu.= '<li><a href="?name='.$entry.'"><img src="'.$thumbFileName.'" /><span>'.ucwords($entry).'</span></a></li>';
				if($mapName == null) {
					$mapName = $entry;
				}
			}
		}
		closedir($mapsHandle);
	}

	$mapFileName = $mapsPath.$mapName.'.jpg';
	$thumbFileName = $mapsPath.'_thumb_'.$mapName.'.jpg';
	$lockerFile = $mapsPath.'_md5_'.$mapName.'.lck';
	$tileFileTemplate = $tilesPath.$mapName.'_%03d_%03d_%03d.jpg';

	// checar si el archivo ya había sido partido en tiles:
	if (file_exists($mapFileName)) {
		$lastLock = null;
		$newLock = md5(($mapFileName).filesize($mapFileName));

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
	$thumbHeight = 1024;
	$thumbWidth = floor($mapWidth * ( $thumbHeight / $mapHeight ));
	$tilesCountX = ceil($mapWidth / $tileWidth);
	$tilesCountY = ceil($mapHeight / $tileHeight);
	$minimapStyle = 'width:'.($thumbWidth / 8).'px;background-image:url('.$thumbFileName.');';

	if($createTiles) {
		$mapImage = imagecreatefromjpeg($mapFileName);
		$thumbImage = imagecreatetruecolor($thumbWidth, $thumbHeight);

		imagecopyresampled($thumbImage, $mapImage, 0, 0, 0, 0, $thumbWidth, $thumbHeight, $mapWidth, $mapHeight);
		imageinterlace($thumbImage, true);
		imagejpeg($thumbImage, $thumbFileName, 80);
		imagedestroy($thumbImage);
	}
?><html>
	<head>
		<title>Warro - Map Navigator</title>
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
	</head>
	<body>
		<div id="container">
			<div class="map-viewport">
				<div id="map" style="height: <?php echo $mapHeight; ?>px; width: <?php echo $mapWidth; ?>px; background-image: url('<?php echo $thumbFileName; ?>')">
					<div style="height: <?php echo $tilesCountY * $tileHeight; ?>px; width: <?php echo $tilesCountX * $tileWidth; ?>px;">					<?php
						if($createTiles) {
							$tileImage = imagecreatetruecolor($tileWidth, $tileHeight);
							imageinterlace($tileImage, true);
						}

						for($tileOffsetY = 0; $tileOffsetY < $tilesCountY; $tileOffsetY++) {
							for($tileOffsetX = 0; $tileOffsetX < $tilesCountX; $tileOffsetX++) {
								$tileFileName = sprintf($tileFileTemplate, 1, $tileOffsetX, $tileOffsetY);

								if($createTiles) {
									$mapOffsetX = $tileOffsetX * $tileWidth;
									$mapOffsetY = $tileOffsetY * $tileWidth;
									imagecopy($tileImage, $mapImage, 0, 0, $mapOffsetX, $mapOffsetY, $tileWidth, $tileHeight);
									imagejpeg($tileImage, $tileFileName, 68);
								}
								echo '<img src="css/images/empty.png" data-original=', $tileFileName,' />';
							}
						}

						if($createTiles) {
							imagedestroy($tileImage);
							imagedestroy($mapImage);
						}

						if($createTiles) {
							file_put_contents($lockerFile, $newLock);
						}
					?>
					</div>
				</div>
			</div>
		</div>
		<ul id="menu"><?php echo $menu; ?></ul>
		<div id="minimap" style="<?php echo $minimapStyle; ?>"><div id="minimapVisor"></div></div>
		<script type="text/javascript" src="js/jLogic.js"></script>
	</body>

</html>