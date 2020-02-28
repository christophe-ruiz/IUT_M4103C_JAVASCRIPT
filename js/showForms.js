(function () {
    'use strict';
    $(() => {
        $('#sign-up')
            .data('open', false)
            .on('click', function () {
                if ($(this).data('open')) {
                    $('#sign-up-form-container').slideUp('fast');
                } else if ($('#sign-in').data('open')) {
                    let other = $('#sign-in');
                    $('#sign-in-form-container').slideUp('fast');
                    other.data('open', !other.data('open'));
                    $('#sign-up-form-container').slideDown(500).css({
                        display: 'flex'
                    });
                } else {
                    $('#sign-up-form-container').slideDown(500).css({
                        display: 'flex'
                    });
                }
                $(this).data('open', !$(this).data('open'));
            });

        $('#sign-in')
            .data('open', false)
            .on('click', function () {
                if ($(this).data('open')) {
                    $('#sign-in-form-container').slideUp('fast');
                } else if ($('#sign-up').data('open')) {
                    let other = $('#sign-up');
                    $('#sign-up-form-container').slideUp('fast');
                    other.data('open', !other.data('open'));
                    $('#sign-in-form-container').slideDown(500).css({
                        display: 'flex'
                    });
                } else {
                    $('#sign-in-form-container').slideDown(500).css({
                        display: 'flex'
                    });
                }
                $(this).data('open', !$(this).data('open'));
            });
    });
})();