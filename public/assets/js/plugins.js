// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
(function(e){e.fn.width_snitch=function(t){var n=e.extend({className:"snitch",style:{border:"1px solid #222","border-radius":"5px",color:"#222","font-size":"1.5em",left:"10px",padding:".5em 1em",position:"fixed",top:"10px","z-index":"666"}},t);this.each(function(){e(this).prepend('<div class="'+n.className+'"></div>');e("."+n.className).text(e(window).width()+" px");n.style&&e("."+n.className).css(n.style);e(window).resize(function(){e("."+n.className).text(e(window).width()+" px")})});return this}})(jQuery);