(function( $ ) {
    var defaults = {
        auto: true,
        speed: 5000,
        animation: true
    };
    $.fn.slider = function(params) {
        params = $.extend({}, defaults, params);
        var self = this,
            cont = self.find('.slider-cont'),
            item = self.find('.slider-item'),
            slideCount = item.length,
            active = cont.find('.slider-item.active').index(), // Поиск активного (первого для показа) слайда
            itemLen = slideCount -1,
            methods = {
                init: function() {
                    //cont.append('<div class="slide-button next"></div><div class="slide-button prev"></div>'); Перенесено в HTML

                    if(active < 0) {
                        active = 0; // Если активный слайдер не указан, по умолчанию первый
                    }

                    if(params.animation) {
                        this.getWidth();
                        $(self).addClass('animation');
                        this.animation(active);
                    } else {
                        this.showSlide(active);
                    }
                    if(params.auto) {
                        this.autoplay();
                    }

                    self.addClass('slider-active');
                },
                showSlide: function(active) {
                    cont.find('.slider-item').eq(active).addClass('active').siblings().removeClass('active');
                },
                next: function() {
                    if(active == itemLen) {
                        active = 0;
                        if(params.animation) {
                            return this.animation(0)
                        } else {
                            return this.showSlide(0);
                        }
                    } else {
                        active++;
                        if(params.animation) {
                            return this.animation(active);
                        } else {
                            return this.showSlide(active);
                        }
                    }
                },
                prev: function() {
                    if(active == 0) {
                        active = itemLen;
                        if(params.animation) {
                            return this.animation(itemLen);
                        } else {
                            return this.showSlide(itemLen);
                        }
                    } else {
                        active--;
                        if(params.animation) {
                            return this.animation(active);
                        } else {
                            return this.showSlide(active);
                        }
                    }
                },
                autoplay: function() {
                    $(self).hover(
                        function(){clearInterval(timer);},
                        function(){timer = setInterval(function () {methods.next();}, params.speed);}
                    );
                    var timer = setInterval(function () {methods.next();}, params.speed);
                },
                getWidth: function() {
                    item.css('width', 100 / slideCount + "%");
                    cont.css('width', 100 * slideCount + "%");
                },
                animation: function(active) {
                    var position = -($(window).width() * active);
                    cont.css('transform', 'translate('+position+'px)');
                }
            };
        methods.init();
        $(self).find('.slide-button').on('click', function(e){
            var target = e.target;
            if($(target).hasClass('next')) {
                methods.next();
            } else if ($(target).hasClass('prev')) {
                methods.prev();
            }
        });
        $(window).resize(function(){
            methods.getWidth();
            methods.animation(active);
        })
    };
})(jQuery);

$('.slider').slider();

$('.slider2').slider({
    auto: false,
    speed: 4000,
    animation: false
});
$('.slider-text').slider();
