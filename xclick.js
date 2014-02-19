(function ($) {
  var CLASS_LOCKED = 'locked';

  function async(handler) {
    return function (evt) {
      var $el = $(this);
      // return if element is locked
      if ($el.hasClass(CLASS_LOCKED)) return;

      $el.addClass(CLASS_LOCKED);

      function _done(cb) {
        // unlock element when done is invoked
        $el.removeClass(CLASS_LOCKED);
        if ($.isFunction(cb)) {
          cb(this);
        }
      }

      var done = $.proxy(_done, this);

      // add done to clickHandler, invoke done to unclock element
      handler.call(this, evt, done);
    };
  }

  $.fn.xclick = function (handler) {
    // bind click event to our wrapped handler
    this.click(async(handler));
  };
}(jQuery));