(function () {
    'use strict';
    $(() => {
        $('#sign-in-form, #sign-up-form').on('submit', function () {
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize()
            }).done(function (data) {
                if (data.success) {
                    window.location.assign('/netflux.html');
                } else {
                    createAlert('error', data.message);
                }
            }).fail(function () {
                createAlert('error', 'Fatal error !');
            })
            return false;
        })
    })
})();