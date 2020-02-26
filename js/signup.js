(function () {
    'use strict';
    $(() => {
        $('#form-login').on('submit', function () {
            $('#messages').fadeOut();
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize()
            }).done(function (data) {
                if (data.success === true) {
                    window.location.href = '/';
                } else {
                    $('#messages').html(data.message).fadeIn();
                }
            }).fail(function () {
                $('body').html('Fatal error');
            });
            return false;
        })
    })
})();