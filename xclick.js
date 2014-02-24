(function ($) {
  var CLASS_LOCKED = 'locked';

  var configList = [];

  function async(handler) {
    return function (evt) {
      var $el = $(this);
      var config = getConfig(this);

      // return if element is locked
      if ($el.hasClass(CLASS_LOCKED)) return;

      $el.addClass(CLASS_LOCKED);
      config.disable(this);

      var done = $.proxy(_done, this);

      // add done to clickHandler, invoke done to unclock element
      handler.call(this, evt, done);


      function _done(cb) {
        // unlock element when done is invoked
        $el.removeClass(CLASS_LOCKED);
        config.enable(this);

        if ($.isFunction(cb)) {
          cb(this);
        }
      }
    };
  }

  $.fn.xclick = function (handler) {
    // bind click event to our wrapped handler
    this.click(async(handler));
  };

  function getConfig(el) {
    var $el = $(el);
    var config;

    var i;
    for (i = 0; i < configList.length; i++) {
      config = configList[i];

      if ($el.is(config.el)) {
        return config;
      }
    }

    return {
      enable: $.noop,
      disable: $.noop
    };
  }

  $.fn.xclick.config = function (options) {
    if (options) {
      configList.push({
        el: options.el,
        enable: options.enable || $.noop,
        disable: options.disable || $.noop
      });
    }
  };
}(jQuery));
