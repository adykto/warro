
<?php

//Captures the petition and load the suitable section
	switch($_GET['section']){
	case '/home':
	//used to simulate more waiting for load the content, remove on yor projects!
	sleep(0);
	?>
 <!--scripts para mapa-->
<script src="js/modernizr-2.min.js"></script>

<!-- block -->

<!-- double tap -->
<script src="js/jquery.doubletap.js"></script>
<script src="http://demos.flesler.com/jquery/scrollTo/js/jquery.scrollTo-min.js"></script> 
<script type="text/javascript" src="js/scrollsync.js"></script>
<script type="text/javascript" src="js/dragscrollable.js"></script>
<script src="js/jquery.effects.core.js"></script> 
<script src="js/jquery.easing.1.3.js"></script>
<link rel="stylesheet" type="text/css" href="css/globo.css" />
<link rel="stylesheet" type="text/css" href="css/animate.css" />
<link rel="stylesheet" type="text/css" href="css/estilo-acordeon.css" />
<link rel="stylesheet" type="text/css" href="css/dianoche.css" />

<!--scripts para menu-acordeon-->
<link rel="stylesheet" type="text/css" href="css/style.css" />

<!-- imgGallery test-->
<link rel="stylesheet" type="text/css" href="css/elastislide.css" />
        <noscript>
            <style>
                .es-carousel ul{
                    display:block;
                }
            </style>
        </noscript>  
         <script id="img-wrapper-tmpl" type="text/x-jquery-tmpl">    
                                <div class="rg-image-wrapper">
                                    {{if itemsCount > 1}}
                                        <div class="rg-image-nav">
                                            <a href="#" class="rg-image-nav-prev">Previous Image</a>
                                            <a href="#" class="rg-image-nav-next">Next Image</a>
                                        </div>
                                    {{/if}}
                                    <div class="rg-image"></div>
                                    <div class="rg-loading"></div>
                                    <div class="rg-caption-wrapper">
                                        <div class="rg-caption" style="display:none;">
                                            <p></p>
                                        </div>
                                    </div>
                                </div>
                 </script>
<!-- imgGallery test-->
	<img id="arrow" src="images/tmpImgs/arrow.png"  height="130" />
<div class="map-wrap">
                
                <div class="location" id="" data-x="" data-y="">
                      <div class="globoContainer" style="z-index: 80; width:450px; background-color: white; position:relative; border-radius: 10px;box-shadow: 0 10px 30px #333;border: 1px solid white;">
                            <div class="contenedorcabecera" style="background-image:url(images/melia.jpg); border-radius: 10px 10px 0 0;">
                            <div class="negocio-info-gral" style="background: -moz-linear-gradient(-45deg, rgba(255, 255, 255, 1) 75%, rgba(255, 255, 255, 0) 100%);
                            background: -webkit-gradient(linear, left top, right bottom, color-stop(75%,rgba(255, 255, 255, 1)), color-stop(100%,rgba(255, 255, 255, 0)));
                            background: -webkit-linear-gradient(-121deg, rgba(255, 255, 255, 1) 75%,rgba(255, 255, 255, 0) 100%);
                            background: -o-linear-gradient(-45deg, rgba(255, 255, 255, 1) 75%,rgba(255, 255, 255, 0) 100%);
                            background: -ms-linear-gradient(-45deg, rgba(255, 255, 255, 1) 75%,rgba(255, 255, 255, 0) 100%);
                            background: linear-gradient(135deg, rgba(255, 255, 255, 1) 75%,rgba(255, 255, 255, 0) 100%);
                            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#80ffffff',GradientType=1 );
                            height:100%; padding:15px 15px 15px 120px;border-radius: 0 10px 0 0; ">
                            <div class="tituloGlobo" style="font-family:myriadpro-bold-webfont; font-size:17px; color: #666; text-shadow:0 1px white;">ME by Melía - Cabo</div>
                            <div class="subtitulo-globo" style="font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif; font-size:13px; color:#666; text-shadow:0 1px white; line-height:16px; margin-top:5px;">
                            <img src="images/logomelia.png" style="position:absolute; left: 27px; top: 39px;" width="64" height="64" />Playa El Medano S/N, El Medano Ejidal, 23410 Cabo San Lucas, Mexico<br />From US: 1 877 9 LIVE ME<br>
                            From Mexico: 800 90 63542<br>
                            From Spain: 902 14 44 40<br />Mail: calidad@melia.com<br />Website: www.me-cabo.com</div>
                            </div>
                            </div><!-- onclick="$('#dialog').dialog('open');"> -->
                            <div class="contieneservicios-globo" style="width:422px; background-color: white; padding:15px; overflow:auto;
                            border-radius: 0 0 10px 10px;-moz-box-shadow:inset 0  8px 8px -8px #696868;-webkit-box-shadow: inset 0  8px 8px -8px #696868; background-color: #F0F0F0;">
                            <a class="gal" href="#" onclick="openDialog('gal');"> <div class="iconoglobo">
                            <div class="imaico" style="background-image:url(images/icos-globo/gallery.png);"></div>
                            Gallery </div></a>
                            <a class="vid" href="#" onclick="openDialog('vid');"><div class="iconoglobo">
                            <div class="imaico" style="background-image:url(images/icos-globo/video.png);"></div>
                            Video </div></a>
                            <a class="info" href="#" onclick="openDialog('info');"><div class="iconoglobo">
                            <div class="imaico" style="background-image:url(images/icos-globo/info.png);"></div>
                            Info</div></a>
                            <a class="info" href="#" onclick="return false;"><div class="iconoglobo">
                             <div class="imaico" style="background-image:url(images/icos-globo/events.png);"></div>
                           Events</div></a>
                            <a class="info" href="#" onclick="return false;"><div class="iconoglobo">
                            <div class="imaico" style="background-image:url(images/icos-globo/promos.png);"></div>
                            Promos</div></a></div>
                            <div style="position:absolute; width:0; height: 0; border-top: 20px solid #F0F0F0; border-left: 15px solid transparent; border-right: 15px solid transparent; left: 200px;"></div>
                      </div>
                </div>
            <div id="tmcMap" style="z-index:0">
             <img src="images/xx-02.png" id="capa1" style="z-index:1;position:absolute; left: 1722px; top: 1315px;"/>
             <img src="images/xx.png" id="capa2" style="z-index:2; position:absolute; left: 256px; top: 627px;"/>  
             <img src="images/youarehere.png" id="capa3" style="z-index:3; position:absolute; left: 460px; top: 880px;"/>          
            </div>
        </div>
<!--Menú Izquierdo-->

    <div class="contenedorLogo">
        <div class="contenedorBotones" style="font-size:12px; color:gray; text-align:center;"><br><br>2012 Demo v1.0<br>by TOUCHMYCITY©</div>
    </div>

    <div class="contenedorAcordeon">        
        <ul class="menu collapsible">       
        <li>
            <a href="#">
    <div class="activitiesCategoria"></div>
    <div class="titulo">Restaurants</div></a>
      <ul class="itemActivo">
                <li><a href="#"><div class="rest-bar"></div>Restaurant &amp; Bar</a></li>
                
            </ul>
        </li>
        
        <li>
            <a href="#"><div class="restaurantsCategoria"></div>
      <div class="titulo">Acomodation</div></a>
            <ul class="itemActivo">
                <li><a href="#"><div class="japanese"></div>
                Hotels</a></li>
                
            </ul>
        </li>      
        <li>
            <a href="#"><div class="nightLifeCategoria"></div>
            <div class="titulo">Activities</div></a>           
            <ul class="itemActivo">
                <li><a href="#">Golf Courses</a></li>
                <li><a href="#">Fishing</a></li>
                <li><a href="#">Dunes Rides</a></li>
                <li><a href="#">Extreme</a></li>
            </ul>          
        </li>       
    </ul>   

</div><!--cierra contenedorAcordeon-->
<!--Cierra Menú Izquierdo-->
<!--EMPIEZA DIA NOCHE - PROMO EVENTOS - WHERE I AM?-->
<div class="continenochedia fondodia">
<div class="contenedordianoche">
<div class=" contienesolluna sol"></div>
<div class="contienetextodianoche">NOW IS:<br /><span style="font-size:40px; " class="clock">00:00</span><br />What can I do?</div>
<div class="contbotones" style="float:left; width:350px;">
<div class="botoneventopromo">Check Events</div><div class="botoneventopromo">Check Promos</div>
</div>
</div>
</div>
<div class="btyouarehere">where am I?</div>
<!--EMPIEZA DIA NOCHE - PROMO EVENTOS - WHERE I AM?-->
<!-- INICIA MAPA PEQUEÑO -->
<div class="contenedormapa2">
<div id="hideMinimap" style="z-index:900">
<img class="stripesmenuderecho" src="images/stripes.png" width="17" height="20"></div>
</div>

<!-- CIERA MAPA PEQUEÑO -->
<!--INICIA Menú DERECHA-->
<div class="contenedormenuderecha">
<div class="contenedornegocios">
<div class="poshoyomenuderecho">
<div class="hoyo">0</div>
<a href="#"><div class="menuderechoON" id="hidemenuderecha">
<img class="stripesmenuderecho" src="images/stripes.png" width="17" height="20"></div></a>
</div>
<div class="cabmenuderecho">
<div class="catmenuderecho"></div>
<div class="subcatmenuderecho"></div>
</div>
<div id="viewport">
<div id="base" class="dragger">
<div class="unnegocio" data-id="1">
<div class="logonegocio"><img src="images/tmpImgs/bats.png"></div>
<div class="t15 gris"> MANGO DECK</div>
<div class=" t12 grisclaro">Playa El Medano S/N, El Medano Ejidal, 23410 Cabo San Lucas, Mexico<br>
  From US: <strong>1 234 56779</strong><br>
From Mexico: <strong>01 800 12345678</strong><br>
 Mail: <strong>contact@me-cabo.com</strong><br />
Website: <strong>www.me-cabo.com</strong></div>
</div>
<div class="unnegocio" data-id="2">
<div class="logonegocio"><img src="images/tmpImgs/beergarden.png"></div>
<div class="t15 gris"> BAJA CANTINA</div>
<div class=" t12 grisclaro">Playa El Medano S/N, El Medano Ejidal, 23410 Cabo San Lucas, Mexico<br>
  From US:<strong>1 234 56779</strong><br>
 From Mexico: <strong>800 90 63542</strong><br>
 Mail: <strong>contact@me-cabo.com</strong><br />
Website:<strong> www.me-cabo.com</strong></div>
</div>
<div class="unnegocio" data-id="0">
<div class="logonegocio"><img src="images/tmpImgs/bar.png"></div>
<div class="t15 gris"> ME by Melía - Cabo
</div>
<div class=" t12 grisclaro">Playa El Medano S/N, El Medano Ejidal, 23410 Cabo San Lucas, Mexico<br>
  From US: <strong>1 877 9 LIVE ME</strong><br>
From Mexico: <strong>800 90 63542</strong><br>
Mail: <strong>calidad@me-cabo.com</strong><br />
Website: <strong>www.me-cabo.com</strong></div>
</div>
</div>
</div>
</div>
</div>
<!--CIERRA Menú DERECHA-->

<div style="display:-webkit-box;display:-moz-box; bottom:0; width:110%;" class="iconsNegocio">
    <img src="images/iconos-servicios/a.png" class="icoserv">
    <img src="images/iconos-servicios/b.png" class="icoserv">
    <img src="images/iconos-servicios/d.png" class="icoserv">
    <img src="images/iconos-servicios/g.png" class="icoserv">
    <img src="images/iconos-servicios/h.png" class="icoserv">
    
</div>

<div id="dialog" title="" ><!-- Dialog -->
<div class="todonegro">
        <div class="fotonegociocab">
        <div class="contenidoinfocab">
        <div  class="contieneicoinfo2">
<img class="icoinfo2" alt="Gallery" src="images/info/ico-info2-02.png" width="80" height="80"><img class="icoinfo2" alt="Video" src="images/info/ico-info2.png" width="80" height="80"><img class="icoinfo2" alt="Info" src="images/info/ico-info2-03.png" width="80" height="80"><img class="icoinfo2" src="images/info/ico-info2-04.png" width="80" height="80"><img class="icoinfo2" src="images/info/ico-info2-05.png" width="80" height="80"></div>
      <div class="botoncerrar"></div>
        <div class="logonegocioinfo"><img src="images/info/logo.png"></div>
        <div class="cabnombre">ME by Mel&iacute;a - Cabo 
          <div class="cabtexto2">★★★★★</div>
        </div>
        </div>
        <div class="contenidoinfo">
        <div class="contienelainfo">          
        <!-- info -->        
        </div><!-- Contienelainfo-->
        </div>
      </div>
    </div>  
        </div><!-- Dialog -->


<div style="position:absolute;left:-3000px;"><!-- info stuff container -->

 <div id="info" style="opacity:0">
 <div class="contienedesc-info">Well known for being a midweek Lounge hotel & a hip-sexy-cosmopolitan weekend Party Hotel ME Cabo holds a cool hypnotic groove. On the finest stretch of beach, as one of the premiere Cabo San Lucas steps down to the sea, its 151 rooms and suites arranged in a terraced embrace of free-form pools and gardens, Bali beds and sunshine.</div>
  
  
  <div class="contienedatosinfo">
  <span class="textoaux">Address:</span> Playa El Medano S/N, El Medano Ejidal, 23410 Cabo San Lucas, Mexico<br />
    <span class="textoaux">From US:</span> 1 877 9 LIVE ME<br>
    <span class="textoaux">From Mexico:</span> 800 90 63542<br>
    <span class="textoaux">From Spain: </span>902 14 44 40<br />
    <span class="textoaux">Mail:</span> calidad@melia.com<br />
    <span class="textoaux">Website: </span>www.me-cabo.com
    </div>
<br />
<br />

<div class="sombraseparadora"></div>
<div class="contienelosservicios">

<div class="textoaux paddingabajo">Special Services </div>
<div>
<span class="textoserviciostitulos">SUITES:</span> Deluxe garden view •  Deluxe Sea of Cortes view • Pettite Suite • Suite at the beach</div>
<div>
<span class="textoserviciostitulos">ME + ACOMODATIONS:</span> Corner at the beach • Chic Suite • Loft  suite • Master Suite • Presidential suite  • Energy Suite • NIKKI Suite</div>
<div>
<span class="textoserviciostitulos">RESTAURANTS:</span> EL DECK • NIKKI BEACH • EL PASSION CLUB</div>
</div>

<div class="contienelosservicios">
<div class="textoaux paddingarribaabajo">General Services </div>
<div class="unservicio">
<img class="icoservicio" src="images/iconos-servicios/a.png" /><br />open beach</div>
<div class="unservicio">
<img class="icoservicio" src="images/iconos-servicios/b.png" /><br /> 
spa
</div>
<div class="unservicio">
<img class="icoservicio" src="images/iconos-servicios/c.png" /><br /> 
fast food
</div>
<div class="unservicio">
<img class="icoservicio" src="images/iconos-servicios/d.png" /><br /> 
parking
</div>
<div class="unservicio">
<img class="icoservicio" src="images/iconos-servicios/e.png" /><br /> 
wi-fi
</div>
<div class="unservicio">
<img class="icoservicio" src="images/iconos-servicios/f.png" /><br /> 
beach zone
</div>
<div class="unservicio">
<img class="icoservicio" src="images/iconos-servicios/a.png" /><br /> 
swimming
</div>
<div class="unservicio">
<img class="icoservicio" src="images/iconos-servicios/g.png" /><br /> 
meat
food</div>
<div class="unservicio">
<img class="icoservicio" src="images/iconos-servicios/h.png" /><br /> 
sea food
</div>
</div>
</div>

        <div id="gallery" style="opacity:0">
                        <div class="content">                                                
                                                <div id="rg-gallery" class="rg-gallery">
                                                    <div class="rg-thumbs">
                                                        <div class="es-carousel-wrapper">
                                                            <div class="es-nav">
                                                                <span class="es-nav-prev">Previous</span>
                                                                <span class="es-nav-next">Next</span>
                                                            </div>
                                                            <div class="es-carousel">
                                                                <ul>
                                                                    <li><a href="#"><img src="images/thumbs/1.jpg" data-large="images/1.jpg" alt="image01" data-description="ME by Melia - Cabo" /></a></li>
                                                                    <li><a href="#"><img src="images/thumbs/2.jpg" data-large="images/2.jpg" alt="image02" data-description="ME by Melia - Cabo" /></a></li>
                                                                    <li><a href="#"><img src="images/thumbs/3.jpg" data-large="images/3.jpg" alt="image03" data-description="ME by Melia - Cabo" /></a></li>
                                                                    <li><a href="#"><img src="images/thumbs/4.jpg" data-large="images/4.jpg" alt="image04" data-description="ME by Melia - Cabo" /></a></li>
                                                                    <li><a href="#"><img src="images/thumbs/5.jpg" data-large="images/5.jpg" alt="image05" data-description="ME by Melia - Cabo" /></a></li>
                                                                    <li><a href="#"><img src="images/thumbs/6.jpg" data-large="images/6.jpg" alt="image06" data-description="ME by Melia - Cabo" /></a></li>
                                                                    <li><a href="#"><img src="images/thumbs/7.jpg" data-large="images/7.jpg" alt="image07" data-description="ME by Melia - Cabo" /></a></li>
                                                                    <li><a href="#"><img src="images/thumbs/8.jpg" data-large="images/8.jpg" alt="image08" data-description="ME by Melia - Cabo" /></a></li>
                                                                    <li><a href="#"><img src="images/thumbs/9.jpg" data-large="images/9.jpg" alt="image09" data-description="ME by Melia - Cabo" /></a></li>
                                                                    <li><a href="#"><img src="images/thumbs/10.jpg" data-large="images/10.jpg" alt="image10" data-description="ME by Melia - Cabo" /></a></li>
                                                                    <li><a href="#"><img src="images/thumbs/11.jpg" data-large="images/11.jpg" alt="image11" data-description="ME by Melia - Cabo" /></a></li>
                                                                    <li><a href="#"><img src="images/thumbs/12.jpg" data-large="images/12.jpg" alt="image12" data-description="ME by Melia - Cabo" /></a></li>
                                                                    <li><a href="#"><img src="images/thumbs/13.jpg" data-large="images/13.jpg" alt="image13" data-description="ME by Melia - Cabo" /></a></li>
                                                                    <li><a href="#"><img src="images/thumbs/14.jpg" data-large="images/14.jpg" alt="image14" data-description="ME by Melia - Cabo" /></a></li>
                                                                    <li><a href="#"><img src="images/thumbs/15.jpg" data-large="images/15.jpg" alt="image15" data-description="ME by Melia - Cabo" /></a></li>
                                                                    <li><a href="#"><img src="images/thumbs/16.jpg" data-large="images/16.jpg" alt="image16" data-description="ME by Melia - Cabo" /></a></li>
                                                                    <li><a href="#"><img src="images/thumbs/17.jpg" data-large="images/17.jpg" alt="image17" data-description="ME by Melia - Cabo" /></a></li>
                                                                    <li><a href="#"><img src="images/thumbs/18.jpg" data-large="images/18.jpg" alt="image18" data-description="ME by Melia - Cabo" /></a></li>
                                                                    <li><a href="#"><img src="images/thumbs/19.jpg" data-large="images/19.jpg" alt="image19" data-description="ME by Melia - Cabo" /></a></li>
                                                                    <li><a href="#"><img src="images/thumbs/20.jpg" data-large="images/20.jpg" alt="image20" data-description="ME by Melia - Cabo" /></a></li>
                                                                    
                                                            </ul>
                                                    </div>
                                                </div>                    
                                            </div>
                                        </div>                
                                    </div>
        </div>    

        <div id="video" style="opacity:0">
            <div style="margin: 0px auto; text-align:center;">
            <iframe style="box-shadow: 0px 10px 33px 0px black;" width="1000" height="500" src="http://www.youtube.com/embed/ZRZjY9E3U1k?wmode=opaque" frameborder="0" allowfullscreen></iframe>
            </div>
        </div> 

        </div>   

<script src="js/before-logic.js"></script>
<script src="js/tmcMap.js"></script>
<script src="js/site.js"></script>
<script src="js/acordeon.js" type="text/javascript"></script>

<script type="text/javascript" src="js/logic.js"></script>
<script type="text/javascript" src="js/jquery.tmpl.min.js"></script>
<script type="text/javascript" src="js/jquery.elastislide.js"></script>
<script type="text/javascript" src="js/gallery.js"></script>  

<script>  

$(document).ready(function(){
        

});

</script>

	<?
		break;
	case '/filtroRestaurantes':
	//used to simulate more waiting for load the content, remove on yor projects!
	sleep(0);
	?>
    
	<?
		break;
	case '/otraSeccion':
		//used to simulate more waiting for load the content, remove on yor projects!
		sleep(0);
		?>
        
		<?
		break;
	case '/masFiltros':
		//used to simulate more waiting for load the content, remove on yor projects!
		sleep(0);
		?>
        
        <?	
		break;
	default:
	?>
	<h1>Sección desconocida</h1>
	<p>Estas en una sección desconocida</p>
	<?
}
?>


