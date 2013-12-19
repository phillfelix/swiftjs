(function ($) {

  $.fn.swift = function (options) {
    options = options || {};
    $.extend(options, {
      duration  : 0.3,
      easing    : 'ease-out',
      size      : 128,
      start     : 0,
      buttons   : true,
      bullets   : true
    });

    var $swift = $(this).addClass('swift');
    var $inner = $('<div class="swift-inner"></div>').prependTo($swift);
    var $list = $swift.find('ul').appendTo($inner);
    var $items = $swift.find('li');

    $inner.width(options.size + 'px');
    $items.width(options.size + 'px');
    $list.width((options.size * $items.length) + 'px');
    $inner.css('margin-left', -(options.size / 2) + 'px');

    var transition = options.duration + 's ' + options.easing;
    $list.css({
      '-webkit-transition'  : transition,
      '-moz-transition'     : transition,
      '-ms-transition'      : transition,
      '-o-transition'       : transition,
      transition            : transition
    });

    $swift.data('sw_active', options.start);
    $items.eq(options.start).addClass('active');

    var move = function (sw_active) {
      $list.css('margin-left', -(sw_active * options.size) + 'px');

      $swift.data('sw_active', sw_active);
      $items.removeClass('active');
      $items.eq(sw_active).addClass('active');

      if (options.bullets) {
        $('.swift-bullet').removeClass('active');
        $('.swift-bullet').eq(sw_active).addClass('active');
      }
    };

    var next = function (e) {
      e.preventDefault();
      var sw_active = $swift.data('sw_active') + 1;
      if (sw_active >= $items.length) { return; }
      move(sw_active);
    };

    var prev = function (e) {
      e.preventDefault();
      var sw_active = $swift.data('sw_active') - 1;
      if (sw_active < 0) { return; }
      move(sw_active);
    };

    if (options.bullets) {
      var $bullets_container = $('<div class="swift-bullets-container"></div>').appendTo($swift);
      for (var i = 0; i < $items.length; i++) {
        $('<span class="swift-bullet" data-index="'+ i +'"></span>').appendTo($bullets_container).click(function(e){
          e.preventDefault();
          move(parseInt(this.dataset.index), 10);
        });
      }
      $('.swift-bullet').eq(options.start).addClass('active');
    }

    if (options.buttons) {
       var $buttons_container = $('<div class="swift-buttons-container"></div>').appendTo($swift);
       $('<button class="swift-button-prev">prev</button>').appendTo($buttons_container).click(prev);
       $('<button class="swift-button-next">next</button>').appendTo($buttons_container).click(next);
    }
  };

})(jQuery);