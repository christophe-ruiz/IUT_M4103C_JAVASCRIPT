let createAlert = function (type, msg) {
    'use strict';
    $('.alerts').append(
        $('<div class="' + type + '"> ' + msg + ' </div>')
            .css({
                display: 'none'
            })
            .fadeIn(1000)
            .on('click', function () {
                $(this).fadeOut(500);
            })
    )
};