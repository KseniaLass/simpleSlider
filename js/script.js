(function( $ ) {
    var defaults = {
        auto: true,
        speed: 5000
    }
    $.fn.slider = function(params) {
        params = $.extend({}, defaults, params);
        var self = this,
            cont = self.find('.slider-cont'),
            item = self.find('.slider-item'),
            slideCount = item.length,
            active = 0,
            itemLen = slideCount -1,
            methods = {
                init: function() {
                    cont.append('<div class="slide-button next"></div><div class="slide-button prev"></div>');
                    this.show(active);

                    if(params.auto) {
                        this.autoplay();
                    }
                },
                show: function(active) {
                    cont.find('img').eq(active).addClass('active').siblings().removeClass('active');
                },
                next: function() {
                    if(active == itemLen) {
                        active = 0;
                        return this.show(0);
                    } else {
                        active++;
                        return this.show(active);
                    }
                },
                prev: function() {
                    if(active == 0) {
                        active = itemLen;
                        return this.show(itemLen);
                    } else {
                        active--;
                        return this.show(active);
                    }
                },
                autoplay: function() {
                    $(self).hover(
                        function(){clearInterval(timer);},
                        function(){timer = setInterval(function () {methods.next();}, (params.speed));}
                    );
                    var timer = setInterval(function () {methods.next();}, (params.speed));
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
    };
})(jQuery);

$('.slider').slider({
    auto: true,
    speed: 2000
});
$('.slider2').slider({
    auto: true,
    speed: 2000
});
