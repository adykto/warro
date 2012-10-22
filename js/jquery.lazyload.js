/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2012 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.8.1
 *
 */
//(function($, window) {
    var $window = $(window);

    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : $(".map-viewport"),//window,
            data_attribute  : "original",
            skip_invisible  : true,
            appear          : null,
            load            : null
        };

        function update() {
            var counter = 0;
      
            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                        /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                        $this.trigger("appear");
                        /* if we found an image we'll load, reset the counter */
                        counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit; 
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed; 
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function(event) {
                return update();
            });
        }


        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
            
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    

                    $("<img />").bind("load", function() {
                            $self
                                .hide()
                                .attr("src", $self.data(settings.data_attribute))
                                [settings.effect](settings.effect_speed);
                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);


                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }    
                            
                        })
                        .attr("src", $self.data(settings.data_attribute));

                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function(event) {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });           

        /* Check if something appears when window is resized. */
        $window.bind("resize", function(event) {
            update();
        });

        /* Force initial check if images should appear. */
        $(document).ready(function() {
            update();
        });
        
        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;
        
        if (settings.container === undefined || settings.container === window) {
            fold = $window.height() + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };
    
    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };
        
    $.abovethetop = function(element, settings) {
        var fold;
        
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };
    
    $.leftofbegin = function(element, settings) {
        var fold;
        
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[':'], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

//})(jQuery, window);
/*LazyLoad*/

/*
    TouchMyCityMap 1.0

*/

//(function($) {
    var target, O;
    var categoria;
    var wrapper,
                container,
                locations,
                menu,
                map,
                navigation,
                fullscreen,
                autohide,
                _mouse,
                _touch,
                _scroller,
                _window;

    function isWithinElement(x, y, el) {
        if (x > el.offset().left && x < el.offset().left + el.width() &&
            y > el.offset().top && y < el.offset().top + el.height()) {
                return true;
            } else {
                return false
            }
    }
    
    function Wrapper() {
        this.el;
        this.css_width;
        this.css_height;
        this.width;
        this.height;
    }
    Wrapper.prototype.init = function() {
        this.el = target.el;
        this.css_width = (O.width == 'auto') ? '100%' : O.width;
        this.css_height = (O.height == 'auto') ? '100%' : O.height;
        this.css();
        this.width = this.el.width();
        this.height = this.el.height();
    }
    Wrapper.prototype.css = function() {
        var base = this;
        base.el.css({
            "width" : base.css_width,
            "height" : base.css_height,
            "overflow" : 'hidden',
            "position" : 'relative'
        });
    }
    Wrapper.prototype.refresh = function() {
        this.width = this.el.width();
        this.height = this.el.height();
        
        target.container.mox = (O.image.width*target.container.z - this.width)*(-1);
        target.container.moy = (O.image.height*target.container.z - this.height)*(-1);
        
        if (typeof window.innerWidth != 'undefined')
        {
             target.fullscreen.viewportWidth = window.innerWidth;
             target.fullscreen.viewportHeight = window.innerHeight;
        }
    }
    
    function Container() {
        this.el;
        this.ox;
        this.oy;
        this.oox;
        this.ooy;
        this.mox;
        this.moy;
        this.z;
        this.mz;
        this.w;
        this.h;
        this.cw;
        this.ch;
    }

    var ImgWidth;
    var ImgHeight;

    Container.prototype.init = function() {
        this.ox = 0;
        this.oy = 0;
        this.oox = 0;
        this.ooy = 0;
        
        this.mox = (O.image.width - target.wrapper.width)*(-1);
        this.moy = (O.image.height - target.wrapper.height)*(-1);
        
        // for zoom
        this.z = O.zoom.initial;
        this.mz = O.zoom.max;
        this.w = O.image.width;
        this.h = O.image.height;
        this.cw = this.w;
        this.ch = this.h;
        
        ////////////////////////
        target.wrapper.el.find(".ncl-container").remove();

        target.wrapper.el.wrapInner('<div class="ncl-container" />');
        this.el = target.wrapper.el.find('.ncl-container');
        
        target.container.css();     
        target.container.center();
        target.container.get_focal_point();
        target.container.zoom_zoom_init();
    }
    Container.prototype.css = function() {
        this.el.css({
            "width" : O.image.width,
            "height" : O.image.height
        });
    },
    Container.prototype.drag_init = function(e) {
        this.el.stop();
        this.refresh();
        this.sx = e.pageX;
        this.sy = e.pageY;
        
        this.iox = this.ox;
        this.ioy = this.oy;
        
        this.left = target.container.ox;
        this.top = target.container.oy;
        
        // for intertia
        this.deltax = 0;
        this.deltay = 0;
        this.inertiaDuration = 1000;
    },
    Container.prototype.drag_drag = function(e) {
        this.ox = this.iox + e.pageX - this.sx;
        this.oy = this.ioy + e.pageY - this.sy;
        
        this.deltax = this.ox - this.left;
        this.deltay = this.oy - this.top;
        
        if (!target.fullscreen.is_fullscreen) {
            this.left = (this.ox < target.container.mox) ? target.container.mox : (this.ox > 0) ? 0 : this.ox;
            this.top = (this.oy < target.container.moy) ? target.container.moy : (this.oy > 0) ? 0 : this.oy;
        } else {
            this.left = this.ox;
            this.top = this.oy;
        }

        target.container.el.css({
            "left" : this.left,
            "top" : this.top,
        });
    },
    Container.prototype.drag_finish = function(e) {
        this.ox = this.el.position().left;
        this.oy = this.el.position().top;
        if (O.animations.inertia) {
            this.apply_inertia(this.get_focal_point, this.deltax, this.deltay);
        } else {
            this.get_focal_point();
        }
            
    }
    Container.prototype.zoom_zoom_init = function() {
        this.cw = this.w;
        this.ch = this.h;
    },
    Container.prototype.zoom_zoom_at = function(factor) {
        this.cw = this.w*factor;
        this.ch = this.h*factor;
        this.z = factor;
        
        this.el.css({
            "width" : this.cw,
            "height" : this.ch
        });
        
        this.zoom_refresh();
        target.locations.refresh();
    }
    Container.prototype.zoom_zoom_in = function() {
        var factor = (target.container.z + 1 > O.zoom.max) ? O.zoom.max : this.z + 1;
        this.cw = this.w*factor;
        this.ch = this.h*factor;
        this.z = factor;
        
        this.z = this.z;
        this.cw = this.cw;
        this.ch = this.ch;
        
        this.mox = (this.cw - target.wrapper.width)*(-1);
        this.moy = (this.ch - target.wrapper.height)*(-1);
        
        var l = -(this.focal_point.x - target.wrapper.width/2) - this.focal_point.x*(this.z - 1);
        var t = -(this.focal_point.y - target.wrapper.height/2) - this.focal_point.y*(this.z - 1);
        
        if (!target.fullscreen.is_fullscreen) {
            var left = (l < this.mox) ? this.mox : (l > 0) ? 0 : l;
            var top = (t < this.moy) ? this.moy : (t > 0) ? 0 : t;
        } else {
            var left = l;
            var top = t;
        }
        this.el.css({ "width" : this.cw, "height" : this.ch, "left" : left, "top" : top });
        target.locations.refresh();
        target.navigation.update();
    }
    Container.prototype.zoom_zoom_out = function() {
        var factor = (target.container.z - 1 < 1) ? 1 : target.container.z - 1;                             
        this.cw = this.w*factor;
        this.ch = this.h*factor;
        this.z = factor;
        
        target.container.z = this.z;
        target.container.cw = this.cw;
        target.container.ch = this.ch;
        
        target.container.mox = (this.cw - target.wrapper.width)*(-1);
        target.container.moy = (this.ch - target.wrapper.height)*(-1);
        
        var l = -(target.container.focal_point.x - target.wrapper.width/2) - target.container.focal_point.x*(this.z - 1);
        var t = -(target.container.focal_point.y - target.wrapper.height/2) - target.container.focal_point.y*(this.z - 1);
        
        if (!target.fullscreen.is_fullscreen) {
            var left = (l < target.container.mox) ? target.container.mox : (l > 0) ? 0 : l;
            var top = (t < target.container.moy) ? target.container.moy : (t > 0) ? 0 : t;
        } else {
            var left = l;
            var top = t;
        }
        
        this.el.css({
            "width" : this.cw,
            "height" : this.ch,
            "left" : left,
            "top" : top
        });
        
        target.locations.refresh();
        target.navigation.update();
    },
    Container.prototype.zoom_refresh = function() {
        this.z = this.z;
        this.cw = this.cw;
        this.ch = this.ch;
        
        if (!target.fullscreen.is_fullscreen) {
            this.mox = (this.cw - target.wrapper.width)*(-1);
            this.moy = (this.ch - target.wrapper.height)*(-1);
        }
        
        var l = -(this.focal_point.x - target.wrapper.width/2) - this.focal_point.x*(this.z - 1);
        var t = -(this.focal_point.y - target.wrapper.height/2) - this.focal_point.y*(this.z - 1);
        
        if (!target.fullscreen.is_fullscreen) {
            var left = (l < this.mox) ? this.mox : (l > 0) ? 0 : l;
            var top = (t < this.moy) ? this.moy : (t > 0) ? 0 : t;
        } else {
            var left = l;
            var top = t;
        }
        
        this.el.css({
            "left" : left,
            "top" : top
        });
    }
    Container.prototype.move = function(direction) {
        if (direction == 'left') {
            this.go_at(this.focal_point.x*this.z - this.w/7, this.focal_point.y*this.z);
        }
        if (direction == 'right') {
            this.go_at(this.focal_point.x*this.z + this.w/7, this.focal_point.y*this.z);
        }
        if (direction == 'up') {
            this.go_at(this.focal_point.x*this.z, this.focal_point.y*this.z - this.h/7);
        }
        if (direction == 'down') {
            this.go_at(this.focal_point.x*this.z, this.focal_point.y*this.z + this.w/7);
        }
    }   
        
    Container.prototype.apply_inertia = function(cb, dx, dy) {
        if (O.animations.inertia) {
            var m = 5, ox, oy;                              
            this.interval;
            var root = this;
            if (this.interval != 1) {
                clearInterval(this.interval);
            }
            var nx, ny;
            var ox1 = root.ox, oy1 = root.oy;
            var fs = target.fullscreen.is_fullscreen;
            this.interval = setInterval(function() {
                if (!fs) {
                    ox = (ox1 + (dx/10)*m < root.mox) ? root.mox : (ox1 + (dx/10)*m > 0) ? 0 : ox1 + (dx/10)*m;
                    oy = (oy1 + (dy/10)*m < root.moy) ? root.moy : (oy1 + (dy/10)*m > 0) ? 0 : oy1 + (dy/10)*m;
                } else {
                    ox = ox1 + (dx/10)*m;
                    oy = oy1 + (dy/10)*m;
                }
                
                root.el.css({
                    "left" : ox,
                    "top" : oy
                });
                
                ox1 = ox;
                oy1 = oy;
                if (ox - root.ox == 0 && oy - root.oy == 0) {
                    clearInterval(root.interval);
                    root.interval = 1;
                }
                
                root.refresh();
                m = m/1.04;

                if (m <= 0.005) {
                    clearInterval(root.interval);
                    root.interval = 1;
                }
            }, 10);
        } else {
            cb();
        }                           
    },
    Container.prototype.constrain = function() {
        this.ox = this.el.position().left;
        this.oy = this.el.position().top;
        
        this.left = (this.ox < this.mox) ? this.mox : (this.ox > 0) ? 0 : this.ox;
        this.top = (this.oy < this.moy) ? this.moy : (this.oy > 0) ? 0 : this.oy;
        
        this.el.css({
            "left" : this.left,
            "top" : this.top,
        });
    },
    Container.prototype.center = function() {
        this.left = (target.wrapper.width - O.image.width)/2;
        this.top = (target.wrapper.height - O.image.height)/2;
        
        this.ox = this.left;
        this.oy = this.top;
        
            this.el.css({
            "left" : this.left,
            "top" : this.top
        });
    },
    Container.prototype.go_at = function(x, y, no_animation) {
        var base = this;
        
        if (O.animations.inertia && this.interval != 1) { 
            clearInterval(this.interval); 
        }
        
        this.ox = (x - target.wrapper.width/2)*(-1);
        this.oy = (y - target.wrapper.height/2)*(-1);
        
        if (!target.fullscreen.is_fullscreen) {
            this.left = (this.ox < this.mox) ? this.mox : (this.ox > 0) ? 0 : this.ox;
            this.top = (this.oy < this.moy) ? this.moy : (this.oy > 0) ? 0 : this.oy;
        } else {
            this.left = this.ox;
            this.top = this.oy;
        }
        
        if (O.animations.move && !no_animation) {
            base.el.stop().animate({ 
                "left" : base.left, 
                "top" : base.top 
                }, {
                    duration : 700,
                    easing : 'easeOutCubic',
                    step : function() {
                        base.refresh();
                    },
                    complete : function() {
                        base.refresh();
                    }
                }
            );
        } else {
            base.el.css({ "left" : base.left, "top" : base.top });
            base.refresh();
        }                           
    },
    Container.prototype.refresh = function() {
        this.ox = this.el.position().left;
        this.oy = this.el.position().top;       
        //this.detectLimit();
        this.get_focal_point();
    },////////Limit detection
    Container.prototype.detectLimit = function() {
        this.ox = this.el.position().left;
        this.oy = this.el.position().top;       
        var IW = $(".ncl-map-image").width();
        var IH = $(".ncl-map-image").height();
        //img.resolution - screen.resolution = top,left * -1
        mX = target.wrapper.width -IW;
        mY = target.wrapper.height-IH;
        
        rightLimit = ((this.ox-50) <= mX);
        leftLimit = ((this.ox+50) >= 0);
        var url = $(".ncl-map-image").attr("src");
        var cuad = url.match(/\d+/g);
        var cuadPos = parseFloat(cuad)+1;
        var cuadNeg = parseFloat(cuad)-1;
        bottomLimit = ((this.oy-50) <= mY);
        topLimit = ((this.oy+50) >= 0);
        topLeft = (topLimit && leftLimit);      
        bottomLeft = (leftLimit && bottomLimit);
        topRight = (rightLimit && topLimit);
        bottomRight = (rightLimit && bottomLimit);

        var switchImg; 
        
        switch(true)
        {

            case topRight:
                $("#arrow").css({"-moz-transform":"rotate(140deg)","-webkit-transform":"rotate(140deg)","top":"10px","left":"79%"});
                $("#arrow").fadeIn(500);                    
                $("#arrow").attr("onclick","alert('amole parriba a la der')");
            break;

            case topLeft:
                $("#arrow").css({"-moz-transform":"rotate(60deg)","-webkit-transform":"rotate(60deg)","top":"10px","left":"10%"});
                $("#arrow").fadeIn(500);    
                $("#arrow").attr("onclick","alert('amole parriba a la izq')");
            break;

            case bottomLeft:
                $("#arrow").css({"-moz-transform":"rotate(315deg)","-webkit-transform":"rotate(315deg)","top":"700px","left":"10%"});
                $("#arrow").fadeIn(500);    
                $("#arrow").attr("onclick","alert('amole pabajo a la izq')");
            break;

            case bottomRight:
                $("#arrow").css({"-moz-transform":"rotate(240deg)","-webkit-transform":"rotate(240deg)","top":"700px","left":"79%"});
                $("#arrow").fadeIn(500);    
                $("#arrow").attr("onclick","alert('amole pabajo a la der')");
            break;

            case topLimit:
                $("#arrow").css({"-moz-transform":"rotate(90deg)","-webkit-transform":"rotate(90deg)","top":"10px","left":"50%"});
                $("#arrow").fadeIn(500);    
                $("#arrow").attr("onclick","alert('amole parriba')");
            break;

            case bottomLimit:
                $("#arrow").css({"-moz-transform":"rotate(270deg)","-webkit-transform":"rotate(270deg)","top":"700px","left":"50%"});
                $("#arrow").fadeIn(500);
                $("#arrow").attr("onclick","alert('amole pabajo')");        
            break;
            case leftLimit:
                if(cuad>1)
                        {                               
                            $("#arrow").css({"-moz-transform":"rotate(0deg)","-webkit-transform":"rotate(0deg)","top":"40%","left":"250px"});
                            $("#arrow").fadeIn(500);
                            
                        }
                        if((cuad-1) == 1)
                        {
                            $("img#i"+parseFloat(cuad)+"").removeClass("ncl-map-image");
                            $("body").scrollTo( { top:1, left:1}, 1 );
                            switchImg = $("#i"+cuadNeg+"");switchImg.addClass('ncl-map-image');$("#i"+cuadNeg+"").fadeIn("fast");
                        }   
            break;
            case rightLimit:
                if(cuad<4)
                {
                    $("#arrow").css({"-moz-transform":"rotate(180deg)","-webkit-transform":"rotate(180deg)","top":"40%","left":"79%"});
                    $("#arrow").fadeIn(500);                    
                    $("#i"+parseFloat(cuad)+"").removeClass("ncl-map-image");
                    $("body").scrollTo( { top:1, left:1}, 1 );
                    switchImg = $("#i"+cuadPos+"");switchImg.addClass('ncl-map-image');$("#i"+cuadPos+"").fadeIn("fast");
                }
                return;             
            break;
            default:
                $("#arrow").fadeOut(500);       
            break;          
        }
        
    }

    Container.prototype.get_focal_point = function() {
        this.focal_point = {
            x : (target.wrapper.width/2 - this.ox)/this.z,
            y : (target.wrapper.height/2 - this.oy)/this.z
        }
    }

    //Click Event for arrow shows up.
    function loadNextImg(event, Obj)
    {
        var heightBrowser= $(window).height();
        $('#tmcMap').empty();

        $('#tmcMap').rmap({
        height : heightBrowser,
            image : {
            src : event.data.c //'images/mapa/csl/1.jpg'
        },
        animations : {
                move : true,
                inertia : true
            },
            zoom : {
                initial : 1,
                max : 1.2
            },
            fullscreen : {
                enabled : false,
                start_in_fullscreen : false
            },
            nav_ui : {
            autohide : false
            }
        });
    }

    //Limit vars
    var rightLimit = false;
    var leftLimit = false;
    var topLimit = false;
    var bottomLimit = false;
    var topRight = false;
    var topLeft = false;
    var bottomLeft = false;
    var bottomRight = false;
    var mX = 0;
    var mY = 0;
    
    /*Location vars*/
    var ar, locs;   
    function Locations() {
        ar=null;
        locs=null;
    }
    Locations.prototype.init = function(result) {
        ar = [];        
        //var dom_elements = $(".location");//target.wrapper.el.find('.location');
        //var l=dom_elements.length;
    
        var l = result.length;
        for (var i=0; i<l; i++) {
            ar[i] = {               
                id : "p"+result[i].id,//$(dom_elements[i]).attr('id'),
                x : result[i].x,//$(dom_elements[i]).attr('data-x'),
                y : result[i].y,//$(dom_elements[i]).attr('data-y'),
                //title : "Titulo"+i,//$(dom_elements[i]).attr('data-title'),
                //main_heading : "Encabezado"+i,//$(dom_elements[i]).find('h1').html(),
                //sub_heading : "SubEncabezado"+i,//$(dom_elements[i]).find('h2').html(),
                //address : "Direccion"+i,//$(dom_elements[i]).find('.address').html(),
                globoContainer : $(".globoContainer").html(),//$(dom_elements[i]).find('.globoContainer').html(),
                //restauranteTipo : "Tipo"+i,//$(dom_elements[i]).find('.restauranteTipo').html(),
                //phone : "Tel"+i,//$(dom_elements[i]).find('.phone').html(),
                //contentText : "Contenido "+i,//$(dom_elements[i]).find('.content').html(),
                url: result[i].url,
            }
        }
        
        //dom_elements.hide();      
        target.locations.html();
        target.locations.css();
    }
    Locations.prototype.html = function() {
            
            var html;
            locs = [];          
            var l = ar.length;
            $(".ncl-location").remove();
            var minimap = $(".contenedormapa2");

            $(".contenedormapa2 div:not(#hideMinimap,#here)").remove();     
            minimap.append("<div style=\"position:relative;top:-85px; width:100%; height:100%; z-index:201;\" id=\"minimapPin\" ></div>")   

            //$(".unnegocio").css({"display":"none"});
            //$(".unnegocio").removeAttr("style");
            
            $(".contenedormenuderecha").animate( { right: "-21px",opacity: ".95","-moz-opacity": "0.95","filter":"alpha(opacity=92)"},1000, "easeOutQuint").delay(800); 
            $(".hoyo").html(l);

            for (var i=0; i<l; i++) {
                
                //var dataId = ar[i].id;                
                //dataId = dataId.substring(1);
                //$(".unnegocio:visible:eq("+i+")").data("id",dataId);
                html = "<div class=\"ncl-location\" id=\""+ar[i].id+"\" style=\"left: "+ar[i].x+"px; top: "+ar[i].y+"px;\">\n";
                
                if(categoria == "h")
                    html += "\t<div class=\"ncl-location-pin\" style=\"background:url('"+ar[i].url+"');\"  data-id=\""+i+"\"></div>\n";                     
                if(categoria == "rb")                               
                    html += "\t<div class=\"ncl-location-pin\" style=\"background:url('"+ar[i].url+"');\"  data-id=\""+(i+1)+"\"></div>\n";

                html += "\t<div class=\"ncl-location-contents\">\n";
                html += "\t\t<div class=\"ncl-location-close\"></div>\n";
                //if (ar[i].main_heading != null && ar[i].main_heading != undefined) { html += "\t\t<h1>"+ar[i].main_heading+"</h1>\n"; }
                //if (ar[i].sub_heading != null && ar[i].sub_heading != undefined) { html += "\t\t<h2>"+ar[i].sub_heading+"</h2>\n"; }
                //if (ar[i].address != null && ar[i].address != undefined) { html += "\t\t<p class=\"address\">"+ar[i].address+"</p>\n"; }
                if (ar[i].globoContainer != null && ar[i].globoContainer != undefined) { html += "\t\t<div class=\"globoContainer\">"+ar[i].globoContainer+"</div>\n"; }
                //if (ar[i].phone != null && ar[i].phone != undefined) { html += "\t\t<p class=\"phone\">"+ar[i].phone+"</p>\n"; }
                //if (ar[i].content != null && ar[i].content != undefined) { html += "\t\t<p class=\"content\">"+ar[i].content+"</p>\n"; }              
                html += "\t</div>\n";
                html += "</div>\n";

                target.container.el.append(html);           
                
                if(categoria == "h")                                
                    locs[i] = $('#'+ar[i].id);  
                if(categoria == "rb")               
                    locs[i+1] = $('#'+ar[i].id);

                $(".globoContainer").css("position","relative");
                //var wMap = $(".ncl-map-image").width(); var hMap = $(".ncl-map-image").height(); //Dimension maxima de todos los sectores juntos
                var wMiniMap = minimap.width(); var hMiniMap = minimap.height(); //Dimensiones del minimapa             
                var imgW = $(".ncl-map-image").width();
                var imgH = $(".ncl-map-image").height(); //Dimensiones del sector 
                var escalaW = imgW / wMiniMap;//(wMap / wMiniMap);
                var escalaH = imgH / hMiniMap;//(hMap / hMiniMap);
                var tPin = (imgH/ar[i].y)*escalaH;//imgW/escalaH;
                var lPin= (imgW/ar[i].x)*escalaW;//imgH/escalaW;
                $("#minimapPin").append("<div  id=\"c"+i+"\"  class=\"circle\" style=\"z-index:"+(201+i)+"; box-shadow: 0px 2px 2px 0px rgba(0, 92, 255, 0.79);-moz-box-shadow: 0px 2px 2px 0px rgba(0, 92, 255, 0.79);background: -webkit-linear-gradient(#00EBFF,#00ADFF,#0CF);background: -moz-linear-gradient(#00EBFF,#00ADFF,#0CF);position: absolute; top:"+(tPin+28)+"px !important; left:"+(lPin+39)+"px !important; width: 5px;height: 5px;-moz-border-radius: 50px; -webkit-border-radius: 50px; border-radius: 50px; \"></div>");//      
                //$(".contenedormenuderecha .unnegocio:eq("+i+")").fadeIn("slow");
            }
    }
    Locations.prototype.css = function() {
        var l = locs.length;
        //for i<l
        var i;

        if(categoria == "h")i = 0;
        else i = 1;
        //alert(l + " " + i);
        for (i; i<l; i++) {
            locs[i].find('.ncl-location-contents').data({ "height" : locs[i].find('.ncl-location-contents').outerHeight() });
            locs[i].find('.ncl-location-contents').data({ "width" : locs[i].find('.ncl-location-contents').outerWidth() });                     
            locs[i].find('.ncl-location-contents').css({
                "top" : - $(locs[i]).find('.ncl-location-contents').data('height') - 90,
                "left": - $(locs[i]).find('.ncl-location-contents').data('width') + 260
            }).hide();
        }
    }
    Locations.prototype.focus = function(index) {
        $('.ncl-location-contents.ncl-active').removeClass('ncl-active').stop().fadeOut(250);
        locs[index].find('.ncl-location-contents').addClass('ncl-active').stop().fadeIn(250);
        //locs[index].find('.ncl-location-contents').addClass('ncl-active').stop().fadeIn(250);     
        $('.ncl-selected-location').removeClass('ncl-selected-location');
        locs[index].addClass('ncl-selected-location');  
        
        //locs[index].addClass('ncl-selected-location');
        var d = (locs[index].find('.ncl-location-contents').data('height'))/2;//(locs[index].find('.ncl-location-contents').data('height'))/2;
        var x,y;
        x = locs[index].parent().css("left");
        y = locs[index].parent().css("top");
        //alert(parseFloat(x) + " " + y);
        //ar[index].x  ar[index].y
        target.container.go_at((x)*target.container.z, (y)*target.container.z - d);

    }
    Locations.prototype.contract = function(index) {
        
    }
    Locations.prototype.refresh = function(no_anim) {
        var z = target.container.z;
        var l = ar.length;
        for (var i=0; i<l; i++) {
            $('.ncl-location#'+ar[i].id).css({
                "left" : ar[i].x * target.container.z,
                "top" : ar[i].y * target.container.z,
            });
        }
    }
    
    function Menu() {
        this.el;
        this.ul;
    }
    Menu.prototype.init = function() {
        target.wrapper.el.append('<div class="ncl-menu-wrap" />');
        this.el = target.wrapper.el.find('.ncl-menu-wrap');
        this.el.append('<ul />');
        this.ul = this.el.find('ul');
        
        /*var l = target.locations.ar.length;
        for (var i=0; i<l; i++) {
            this.ul.append('<li id="ncl-location-'+i+'">'+target.locations.ar[i].title+'</li>');
        }*/
    }
    
    function Map() {
        this.img;
        this.el;
    }
    var counter = 0;
    Map.prototype.init = function() {
        //this.img = new Image();
        //this.img.src = O.image.src;
        //$(this.img).addClass('ncl-map-image');
        $("#dragger").addClass('ncl-map-image');
        //$("#map").addClass('ncl-map-image');
        //target.container.el.append($(this.img));
        
        this.el = $("#dragger");//$(this.img);

        /*Delete children elements of .ncl-container to prevent rendering recursion*/        
        //$('.ncl-container>.ncl-container').remove();
        //$('.ncl-container>.ncl-nav-wrap').remove();
                
    }
    
    function Navigation() {
        this.el;
        this.sliderPos;
        this.sliderDraggable;
        this.sliderHeight;
        this.sy;
        this.moy;
    }
    Navigation.prototype.init = function() {
        this.el;
        this.sliderPos = 100;
        
        this.html();
        this.css();
    },
    Navigation.prototype.html = function() {
        target.wrapper.el.find(".ncl-nav-wrap").remove();
        target.wrapper.el.append('<div class="ncl-nav-wrap" />');
        this.el = target.wrapper.el.find('.ncl-nav-wrap');
        
        var html;
        
        if (O.nav_ui.move_ui) {
            html = '<div class="ncl-nav-move">';
                html += '<div class="ncl-move-left"></div>';
                html += '<div class="ncl-move-right"></div>';
                html += '<div class="ncl-move-up"></div>';
                html += '<div class="ncl-move-down"></div>';
            html += '</div>';
        }
        
        if (O.nav_ui.zoom_ui) {
            html += '<div class="ncl-slider-wrap">';
                html += '<div class="ncl-slider">';
                    html += '<div class="ncl-slider-draggable"></div>';
                    html += '<div class="ncl-slider-slidebar"></div>';
                html += '</div>';
                //html += '<div class="ncl-slider-zoomin"></div>';
                //html += '<div class="ncl-slider-zoomout"></div>';
            html += '</div>';
        }
        
        this.el.append(html);
        
        this.sliderDraggable = this.el.find('.ncl-slider-draggable');
        this.sliderHeight = this.el.find('.ncl-slider').height();
        
        if (!O.nav_ui.move_ui && O.nav_ui.zoom_ui) {
            target.wrapper.el.find('.ncl-slider-wrap').addClass('ncl-single');
        }
    },
    Navigation.prototype.css = function() {
        
    }
    Navigation.prototype.update = function() {
        this.sliderPos = -(target.container.z - O.zoom.max)/(O.zoom.max-1)*100;
        
        this.sliderDraggable.css({
            "top" : this.sliderPos+"%"
        });
    }
    Navigation.prototype.drag_init = function(e) {
        this.sy = e.pageY;
        this.moy = 100;
        // this.sliderHeight = target.navigation.sliderHeight;
        
        this.sliderPos = (e.pageY - this.el.find('.ncl-slider').offset().top)/this.sliderHeight*100;
        target.navigation.sliderDraggable.css({
            "top" : this.sliderPos+'%'
        });
    }
    Navigation.prototype.drag_drag = function(e) {
        this.oy = this.sliderPos + ((e.pageY - this.sy)/this.sliderHeight * 100);
        this.oy = (this.oy > 100) ? 100 : (this.oy < 0) ? 0 : this.oy;
        
        this.sliderDraggable.css({
            "top" : this.oy+'%'
        });
        
        target.container.zoom_zoom_at((1 - (this.oy/100))*(O.zoom.max-1) + 1);
    }
    Navigation.prototype.drag_finish = function(e) {
        target.navigation.sliderPos = this.oy;

    }
    Navigation.prototype.touch_init = function(e) {
        target.container.el.stop();
        this.sd = Math.sqrt(Math.pow(e.touches[0].pageX - e.touches[1].pageX, 2) + Math.pow(e.touches[0].pageY - e.touches[1].pageY, 2));
        this.startPos = this.sliderPos;
    }
    Navigation.prototype.touch_drag = function(e) {
        this.d = Math.sqrt(Math.pow(e.touches[0].pageX - e.touches[1].pageX, 2) + Math.pow(e.touches[0].pageY - e.touches[1].pageY, 2));
        this.delta = this.d - this.sd;
        
        this.sliderPos = this.startPos - ((this.delta/6)/this.sliderHeight * 100);
        this.sliderPos = (this.sliderPos < 0) ? 0 : (this.sliderPos > 100) ? 100 : this.sliderPos;
        
        this.sliderDraggable.css({
            "top" : this.sliderPos+'%'
        });
        
        target.container.zoom_zoom_at((1 - (this.sliderPos/100))*(O.zoom.max-1) + 1);
    }
    Navigation.prototype.touch_finish = function(e) {
        this.sd = 0;
        this.d = 0;
        this.delta = 0;
        
        target.navigation.sliderPos = this.sliderPos;       
    }
    
    function Fullscreen() {
        this.button;
        this.is_fullscreen;
        this.viewportWidth;
        this.viewportHeight;
        this.button;
    }
    Fullscreen.prototype.init = function() {
        this.html();
        this.button = target.wrapper.el.find('.ncl-fullscreen');
        this.is_fullscreen = false;
        
        if (typeof window.innerWidth != 'undefined')
        {
             this.viewportWidth = window.innerWidth;
             this.viewportHeight = window.innerHeight;
        }
    }
    Fullscreen.prototype.html = function() {
        target.wrapper.el.append('<div class="ncl-fullscreen" />');
    }
    Fullscreen.prototype.enter = function() {
        this.button.css({ "right" : 30 });
        this.is_fullscreen = true;
        target.wrapper.el.wrap('<div class="ncl-fullscreen-wrap" />');
        target.wrapper.el.parent().css({ "width" : this.viewportWidth, "height" : this.viewportHeight });
        
        if (O.width != 'auto') { target.wrapper.el.css({ "width" : '100%' }) }
        if (O.height != 'auto') { target.wrapper.el.css({ "height" : '100%' }) }
        
        target.wrapper.refresh();
        target.container.go_at(target.container.focal_point.x*target.container.z, target.container.focal_point.y*target.container.z, true);
    }
    Fullscreen.prototype.refresh = function() {
        if (typeof window.innerWidth != 'undefined')
        {
             this.viewportWidth = window.innerWidth;
             this.viewportHeight = window.innerHeight;
        }
        target.wrapper.el.parent().css({ "width" : this.viewportWidth, "height" : this.viewportHeight });
    }
    Fullscreen.prototype.exit = function() {
        this.button.css({ "right" : 15 });
        this.is_fullscreen = false;
        target.wrapper.el.unwrap();
        if (O.width != 'auto') { target.wrapper.el.css({ "width" : target.wrapper.css_width }) }
        if (O.height != 'auto') { target.wrapper.el.css({ "height" : target.wrapper.css_height }) }
        target.wrapper.refresh();
        target.container.go_at(target.container.focal_point.x*target.container.z, target.container.focal_point.y*target.container.z, true);
    }
    
    function Autohide() {
        this.ui;
    }
    Autohide.prototype.init = function() {
        var base = this;
        var visible = false;
        base.ui = $('.ncl-nav-move').add('.ncl-slider-wrap').add('.ncl-fullscreen').add('.ncl-menu-wrap');
        
        base.ui.fadeOut();
        
        target.wrapper.el.on('mouseover', function(e) {
            if (isWithinElement(e.pageX, e.pageY, target.wrapper.el)) { 
                base.ui.fadeIn();
            }
        });
        
        target.wrapper.el.on('mouseout', function(e) {
            if (!isWithinElement(e.pageX, e.pageY, target.wrapper.el)) { 
                base.ui.fadeOut();
            }
        });
    }
    
    function Mouse() {
        this.mouseDown;
        this.dragging;
        this.sliderDragging;
        this.sliderMouseDown;
    }
    Mouse.prototype.init = function() {
        var base = this;
        
        base.mouseDown = false;
        base.dragging = false;
        base.sliderDragging = false;
        base.sliderMouseDown = false;
        
        // mousedown
        target.wrapper.el.on('mousedown', function(e) {
            e.preventDefault();
            
            if (O.animations.inertia && target.container.interval != 1) { 
                clearInterval(target.container.interval); 
            }
            
            if ($(e.target).closest('.ncl-slider').length != 0) {
                base.sliderMouseDown = true;
            } else {
                base.mouseDown = true;
            }
            
            return false;
        });
        $(document).on('mousemove', function(e) {
            e.preventDefault();
            if (base.mouseDown && !base.dragging) {
                base.dragging = true;
                target.container.drag_init(e);
            }
            if (base.dragging) {
                target.container.drag_drag(e);
            }
            
            if (base.sliderMouseDown && !base.sliderDragging) {
                base.sliderDragging = true;
                target.navigation.drag_init(e);
            }
            if (base.sliderDragging) {
                target.navigation.drag_drag(e);
            }
            return false;
        });
        $(document).on('mouseup', function(e) {
            if (base.mouseDown) {
                base.mouseDown = false;
            }
            if (base.dragging) {
                base.dragging = false;
                target.container.drag_finish(e);
            }
            
            if (base.sliderMouseDown) {
                base.sliderMouseDown = false;
            }
            if (base.sliderDragging) {
                base.sliderDragging = false;
                target.navigation.drag_finish(e);
            }
        });
        
        // click mouse
        //target.wrapper.el
        $(document).on('click', function(e) {
            e.preventDefault();
        
            if ($(e.target).hasClass('ncl-fullscreen')) {
                if (target.fullscreen.is_fullscreen) { 
                    target.fullscreen.exit(); 
                } else {
                    target.fullscreen.enter();
                }
            } else if ($(e.target).closest('.ncl-menu-wrap').length != 0) {
                var index = $(e.target).attr('id').replace('ncl-location', '');                                                 
                target.locations.focus(index);
            } else if ($(e.target).hasClass('ncl-location-pin')) {
                var index = $(e.target).attr('data-id');                                
                target.locations.focus(index);
            }
            else if ($(e.target).parent().hasClass('ncl-nav-move')) {
                var direction = $(e.target).attr('class').replace('ncl-move-', '');
                target.container.move(direction);
            } else if ($(e.target).hasClass('ncl-location-close')) {
                $('.ncl-location-contents.ncl-active').removeClass('ncl-active').stop().fadeOut(250);
            }
            
        });
    }
    
    function Scroller() {
        
    }
    Scroller.prototype.init = function() {
        var base = this;
        target.container.el.mousewheel(function(e, delta) {
            e.preventDefault();
            /*if (O.animations.inertia && target.container.interval != 1) {
                clearInterval(target.container.interval); 
            }
            if (delta > 0) {
                target.container.zoom_zoom_in();
                
            } else {
                target.container.zoom_zoom_out();
            }*/
            return false;
        });
    }
    
    function Touch() {
        this.fingerDown;
        this.dragging;
        this.sliderFingerDown;
        this.sliderDragging;
        this.twoFingersDown;
        this.twoFingersDragging;
    }
    Touch.prototype.init = function() {
        var base = this;
        
        base.fingerDown = false;
        base.dragging = false;
        base.sliderFingerDown = false;
        base.sliderDragging = false;
        base.twoFingersDown = false;
        base.twoFingersDragging = false;
        
        var flag = false;
        $(".contieneservicios-globo a").live("touchstart", function(e){
                e.preventDefault();
                

            if (!flag) {
                flag = true;
                setTimeout(function(){ flag = false; }, 100);

            switch($(this).attr("class"))
                {
                    case "info":
                    openDialog("info");
                    break;
                    case "vid":
                    openDialog("vid");
                    break;
                    case "gal":
                    openDialog("gal");
                    break;
                }
            }
                return false;
        });

        target.wrapper.el.get(0).addEventListener('touchstart', function(e) {
            e.preventDefault();
            
            if (O.animations.inertia && target.container.interval != 1) { 
                clearInterval(target.container.interval); 
            }
            
            if (e.touches.length > 1) {
                base.twoFingersDown = true;
            } else if ($(e.target).hasClass('ncl-fullscreen')) {
                if (target.fullscreen.is_fullscreen) { 
                    target.fullscreen.exit(); 
                } else {
                    target.fullscreen.enter();
                }
            } else if ($(e.target).closest('.ncl-menu-wrap').length != 0) {
                var index = $(e.target).attr('id').replace('ncl-location-', '');                                    
                target.locations.focus(index);
            } else if ($(e.target).hasClass('ncl-location-pin')) {
                var index = $(e.target).attr('data-id');
                target.locations.focus(index);
            } else if ($(e.target).closest('.ncl-slider').length != 0) {
                base.sliderFingerDown = true;
            } else if ($(e.target).hasClass('ncl-slider-zoomin')) {
                target.container.zoom_zoom_in();
            } else if ($(e.target).hasClass('ncl-slider-zoomout')) {
                target.container.zoom_zoom_out();
            } else if ($(e.target).parent().hasClass('ncl-nav-move')) {
                var direction = $(e.target).attr('class').replace('ncl-move-', '');
                target.container.move(direction);
            }
            else if ($(e.target).hasClass('ncl-location-close')) {
                $('.ncl-location-contents.ncl-active').removeClass('ncl-active').stop().fadeOut(250);
            }
             else {
                base.fingerDown = true;
            }
            return false;
        }, false);

        document.addEventListener('touchmove', function(e) {
            if (base.fingerDown && !base.dragging && e.touches.length == 1) {
                e.preventDefault();
                base.dragging = true;
                target.container.drag_init(e.touches[0]);
            } else if (base.dragging && e.touches.length == 1) {
                e.preventDefault();
                target.container.drag_drag(e.touches[0]);
            } else if (base.sliderFingerDown && !base.sliderDragging && e.touches.length == 1) {
                e.preventDefault();
                base.sliderDragging = true;
                target.navigation.drag_init(e.touches[0]);
            } else if (base.sliderDragging && e.touches.length == 1) {
                e.preventDefault();
                target.navigation.drag_drag(e.touches[0]);
            } else if (base.twoFingersDown && !base.twoFingersDragging) {
                e.preventDefault();
                base.twoFingersDragging = true;
                target.navigation.touch_init(e);
            } else if (base.twoFingersDragging) {
                e.preventDefault();
                target.navigation.touch_drag(e);
            }
            return false;
        }, false);
        document.addEventListener('touchend', function(e) {
            if (base.fingerDown) {
                e.preventDefault();
                base.fingerDown = false;
            }
            if (base.dragging) {
                e.preventDefault();
                base.dragging = false;
                target.container.drag_finish(e.touches[0]);

            }
            if (base.sliderFingerDown) {
                e.preventDefault();
                base.sliderFingerDown = false;
            }
            if (base.sliderDragging) {
                e.preventDefault();
                base.sliderDragging = false;
                target.navigation.drag_finish(e.touches[0]);
            }
            if (base.twoFingersDown) {
                e.preventDefault();
                base.twoFingersDown = false;
                target.navigation.touch_finish();
            }
            if (base.twoFingersDragging) {
                e.preventDefault();
                base.twoFingersDragging = false;
                target.navigation.touch_zoom.finish();
            }

            return false;
        }, false);
    }
    
    function Window() {
        
    }
    Window.prototype.init = function() {
        $(window).on('resize.ncl', function() {
            target.wrapper.refresh();
            target.container.go_at(target.container.focal_point.x*target.container.z, target.container.focal_point.y*target.container.z, true);
            if (target.fullscreen.is_fullscreen) {
                target.fullscreen.refresh();
            }
        });
    }
    
    $.fn.rmap = function(options) {
        var D = {
            width : 'auto',
            height : 'auto',
            image : {
                src : '' /*map source*/
            },
            nav_ui : {
                show : true,
                autohide : false,
                move_ui : true,
                zoom_ui : true
            },
            menu : {
                show : false
            },
            animations : {
                move : true,
                inertia : true
            },
            zoom : {
                initial : 1,
                max : 1.2
            },
            fullscreen : {
                enabled : false,
                start_in_fullscreen : false
            },
            initial_location : false
        };
        
        O = $.extend(true, D, options);
        
        function normalize_options(options) {
            if (options.fullscreen) {
                options.width = 'auto';
                options.height = 'auto';
            }
            if (options.zoom.initial < 1) options.zoom.initial = 1;
        }
        //var counter = 0;
        return this.each(function() {
            
            
            wrapper = new Wrapper(),
                container = new Container(),
                locations = new Locations(),
                menu = new Menu(),
                map = new Map(),
                navigation = new Navigation(),
                fullscreen = new Fullscreen(),
                autohide = new Autohide(),
                _mouse = new Mouse(),
                _touch = new Touch(),
                _scroller = new Scroller(),
                _window = new Window();
                
            var el = $(this);
            /////////Cambiar img de acuerdo al sig cuadrante
            //var img = new Image();
            //$(img).attr('src', O.image.src);            
            //img.onload = onloadImg;
            //$(imgObj).fadeIn("fast",onloadImg);

            //function onloadImg() {
                    
                //O.image.width = img.width;
               // O.image.height = img.height;
                
                el.addClass('ncl-root');
                
                target = {
                    el : el,
                    wrapper : wrapper,
                    container : container,
                    locations : locations,
                    menu : menu,
                    map : map,
                    navigation : navigation,
                    fullscreen : fullscreen,
                    autohide : autohide,
                    _mouse : _mouse,
                    _touch : _touch,
                    _scroller : _scroller,
                    _window : _window
                }

                target.wrapper.init();
                target.container.init();
                target.map.init();
                //$("#tmcMap").css({"z-index":0});
                //target.locations.init();
                if (O.nav_ui.show) { target.navigation.init(); }
                if (O.menu.show) { target.menu.init(); }
                if (O.fullscreen.enabled) { target.fullscreen.init(); }

                target._mouse.init();
                if ('ontouchstart' in document.documentElement) { target._touch.init(); }
                target._scroller.init();
                target._window.init();

                if (O.fullscreen.start_in_fullscreen) target.fullscreen.enter();

                if (O.zoom.initial > 1) {
                    target.container.zoom_zoom_at(O.zoom.initial);
                    target.navigation.update();
                }

                if (O.nav_ui.autohide) {
                    target.autohide.init();
                }
                //alert(counter++);
                
                /*if (O.initial_location != false && O.initial_location <= target.locations.ar.length && O.initial_location > 0) {
                    target.locations.focus(O.initial_location - 1);
                }*/
            //}               
        });         
            //$('#tmcMap>.ncl-container>div:not(.ncl-nav-wrap)').empty();$('.ncl-container>div.ncl-container').empty();
    }
//})(jQuery);

jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
    easeInCubic: function (x, t, b, c, d) {
        return c*(t/=d)*t*t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    }
});

(function(d){function e(a){var b=a||window.event,c=[].slice.call(arguments,1),f=0,e=0,g=0,a=d.event.fix(b);a.type="mousewheel";b.wheelDelta&&(f=b.wheelDelta/120);b.detail&&(f=-b.detail/3);g=f;void 0!==b.axis&&b.axis===b.HORIZONTAL_AXIS&&(g=0,e=-1*f);void 0!==b.wheelDeltaY&&(g=b.wheelDeltaY/120);void 0!==b.wheelDeltaX&&(e=-1*b.wheelDeltaX/120);c.unshift(a,f,e,g);return(d.event.dispatch||d.event.handle).apply(this,c)}var c=["DOMMouseScroll","mousewheel"];if(d.event.fixHooks)for(var h=c.length;h;)d.event.fixHooks[c[--h]]=
d.event.mouseHooks;d.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=c.length;a;)this.addEventListener(c[--a],e,!1);else this.onmousewheel=e},teardown:function(){if(this.removeEventListener)for(var a=c.length;a;)this.removeEventListener(c[--a],e,!1);else this.onmousewheel=null}};d.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);

