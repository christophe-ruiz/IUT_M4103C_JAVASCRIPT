(function () {
    'use strict';
    $(function () {
        $('#sign-up')
            .data('clicked', false)
            .on('click', function () {
                if ($(this).data('clicked')) return;
                $(this).data('clicked', !$(this).data('clicked'));
                $('#navbar')
                    .after('<div class="logForm"/>')
                    .slideDown(1000, "slow");
            })
    });
})();