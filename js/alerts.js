let createAlert = function (type, msg) {
    'use strict';
    $('.alerts').append(
        $('<div class="' + type + '"/>')
            .append(
                $('<div/>')
                    .html(msg)
                    .css({
                        cursor : 'default'
                    }),
                $('<span/>')
                    .html('Close')
                    .on('click', function () {
                        $(this).parent().fadeOut(500);
                    })
                    .css({
                        'font-weight' : 'bold',
                        cursor : 'pointer',
                        'padding-left' : '0.8vw',
                        'margin-left' : '0.8vw',
                        'border-left' : '2px solid rgba(255,255,255,0.5)'
                    })
            )
            .hide()
            .fadeIn(1000)
    )
};