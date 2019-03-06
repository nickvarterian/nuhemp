$(document).ready(function() {
  $('#site-loading').introLoader({
    animation: {
      name: 'doubleLoader',
      options: {
        ease: 'easeInOutCirc',
        style: 'light',
        delayBefore: 500,
        exitTime: 300,
        progbarTime: 700,
        progbarDelayAfter: 400,
        onAfter: function() {
          AOS.init({ offset: 0, duration: 600, easing: 'ease-out-expo' });
        }
      }
    }
  }),
    (videoLightBox = (function() {
      var t = function(t) {
          var i = $(t),
            e = i.find('.play-button'),
            o = i.find('.video-wrap');
          e.bind('click', function(t) {
            event.preventDefault(), n(o);
          });
        },
        n = function(t) {
          var n = t.html(),
            i = ($('ptExt--video-lightbox'),
            '<div class="ptExt--video-lightbox">    <div class="ptExt-embed">        <a href="#"><i>✕</i></a>        <p>' +
              n +
              '</p>        </div>    <span class="ptExt--overlay"></span></div>'),
            e = function(t) {
              t.preventDefault();
              var n = $('.ptExt--video-lightbox');
              n.removeClass('-open-lightbox'),
                $('body').removeClass('-do-not-scroll'),
                setTimeout(function() {
                  n.remove(),
                    n.find('a').unbind('click'),
                    n.find('.ptExt--overlay').unbind('click');
                }, 600);
            };
          $('body')
            .append(i)
            .addClass('-do-not-scroll');
          var o = $('.ptExt--video-lightbox');
          o.addClass('-open-lightbox'),
            o.find('a').bind('click', e),
            o.find('.ptExt--overlay').bind('click', e);
        };
      $('.video-player.-trigger').each(function() {
        new t(this);
      });
    })()),
    (imageslideshow = (function() {
      var t = function(t) {
        var n = $(t),
          i = n.data('images'),
          e = n.data('duration'),
          o = n.data('fade');
        n.backstretch(i, { duration: e, fade: o });
      };
      $('.-bg-image.-slideshow').each(function() {
        new t(this);
      });
    })()),
    (newsletter = (function() {
      var t = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i,
        n = function(t) {
          $(document.body).append(
            $(t)
              .find('.notify-wrap')
              .detach()
          );
          var n = $(t),
            e = $('body'),
            o = {
              $form: n.find('form'),
              $button: n.find('a'),
              $input: n.find('input'),
              $notify: e.find('.notify-wrap'),
              action: n.find('form').data('submit-to') || 'email'
            };
          o.$button.bind('click', function(t) {
            event.preventDefault(), i(o);
          }),
            o.$form.bind('submit', function(t) {
              event.preventDefault(), i(o);
            });
        },
        i = function(n) {
          var i = n.$input.val(),
            e = { endpoint: './php/submit.php', action: n.action },
            o = function() {
              n.$notify.addClass('-error'),
                setTimeout(function() {
                  n.$notify.removeClass('-error');
                }, 5e3);
            },
            a = function() {
              n.$notify.addClass('-submitted-error'),
                n.$notify.removeClass('-error'),
                setTimeout(function() {
                  n.$notify.removeClass('-submitted-error');
                }, 5e3);
            },
            r = function() {
              n.$notify.addClass('-submitted'),
                n.$notify.removeClass('-error'),
                setTimeout(function() {
                  n.$notify.removeClass('-submitted'),
                    n.$form.removeClass('-sending'),
                    n.$input.val('');
                }, 5e3);
            },
            d = function() {
              n.$notify.removeClass('-error'), n.$form.addClass('-sending');
              var t = $.ajax({
                url: e.endpoint,
                method: 'POST',
                data: { action: e.action, email: i }
              });
              t.done(function(t) {
                r();
              }),
                t.fail(function(t, n) {
                  a();
                });
            };
          return i ? ('' == i || t.test(i) ? void d() : void o()) : ((fail = !0), void o());
        };
      $('.newsletter-form').each(function() {
        new n(this);
      });
    })());
});
