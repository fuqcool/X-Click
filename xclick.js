(function ($) {
  var CLASS_LOCKED = 'locked';

  var events = [];

  function async(handler) {
    return function (evt) {
      var $el = $(this);
      var callbacks = getCallbacks(this);

      // return if element is locked
      if ($el.hasClass(CLASS_LOCKED)) return;

      $el.addClass(CLASS_LOCKED);
      callbacks.disable.call(this, this);

      var done = $.proxy(_done, this);

      // add done to clickHandler, invoke done to unclock element
      handler.call(this, evt, done);

      function _done(cb) {
        // unlock element when done is invoked
        $el.removeClass(CLASS_LOCKED);
        callbacks.enable.call(this, this);

        if ($.isFunction(cb)) {
          cb.call(this, this);
        }
      }
    };
  }

  $.fn.xclick = function (handler) {
    // bind click event to our wrapped handler
    this.click(async(handler));
  };

  function getCallbacks(el) {
    var $el = $(el);
    var event;
    var i;

    for (i = 0; i < events.length; i++) {
      event = events[i];

      if ($el.is(event.el)) {
        return event;
      }
    }

    // return a stub if callbacks not found
    return {
      enable: $.noop,
      disable: $.noop
    };
  }

  $.fn.xclick.on = function (options) {
    if (options) {
      events.push({
        el: options.el,
        enable: options.enable || $.noop,
        disable: options.disable || $.noop
      });
    }
  };
}(jQuery));
