X-Click
=======

X-Click is a jquery plugin which prevents the user from clicking an element for more than once before certain work is complete. This is extremely useful for buttons that submit data, or do some communication with the server.

## Install
There are two ways to install X-Click. Use either of them.

- Install via **bower**. Run following command in your terminal.

``` bash
bower install xclick
```

- Download project from github directly and uncompress it.

## Usage

X-Click provides just two methods to make the work done.

``` javascript
$('.btn').xclick(function (evt, done) {
  setTimeout(function () {
    done();
  }, 1000);
});
```

The **xclick** api behaves very much like **jQuery.click** except that **xclick** give you another input argument called **done**. When the element is clicked, it will be locked until **done** is invoked.

``` javascript
$.fn.xclick.on({
  el: '.btn',  // selector
  enable: function (el) {
    $(el).prop('disabled', false);
  }, 
  disable: function (el) {
    $(el).prop('disabled', true);
  }
});
```

Believe me, it's really annoying to change the style of the button before or after work is done. That's why I created **on** method, which can do the trivial styling work for us in batch.

## Live example
I also created a demo on jsFiddle, check it out at [http://jsfiddle.net/fuqcool/ggM56/](http://jsfiddle.net/fuqcool/ggM56/).

## License
MIT License

