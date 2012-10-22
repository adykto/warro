$(document).ready(function() {
$('.mapaSanJose,.mapaCorredorTuristico').hide();
$('#france,#russia,#poland,#argentina,#australia,#brazil,#usa,#japan').hide();
$('.containerActividades,.menuSideBar').hide();
});

//btnSanJose
$('.btnSanJose').click(function() {
/*$('.mapaSanJose,#france,#russia,#poland,#argentina,#australia,#brazil,#usa,#japan').fadeIn('fast');*/
$('.containerInicio').slideUp({queue:false, duration: 700, easing: 'easeInElastic'});
$('.containerActividades').slideDown({queue:false, duration: 1000, easing: 'easeOutBounce'});
});

//actRestaurantes
$('.actRestaurantes').click(function() {
$('.mapaSanJose,#france,#russia,#poland,#argentina,#australia,#brazil,#usa,#japan').fadeIn(700);
$('.containerActividades').slideUp({queue:false, duration: 700, easing: 'easeInElastic'});
$('.menuSideBar').slideDown({queue:false, duration: 700, easing: 'easeOutCubic'});

});

//Home
$('.home').click(function() {
$('.mapaSanJose,#france,#russia,#poland,#argentina,#australia,#brazil,#usa,#japan').fadeOut(500);
$('.containerInicio').slideDown({queue:false, duration: 700, easing: 'easeInElastic'});
$('.containerActividades').slideUp({queue:false, duration: 400, easing: 'easeInElastic'});
$('.menuSideBar').slideUp({queue:false, duration: 400, easing: 'easeOutCubic'});

});

//logoSeccionActiva2
$('.logoSeccionActiva2').click(function() {
$('#mapaInteractivo1').hide();

$("#mapaInteractivo1").addClass("esconderMapa");
});



