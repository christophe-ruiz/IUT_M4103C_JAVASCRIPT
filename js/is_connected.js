(function () {
    'use strict';
    $(() => {
        $.ajax({
            url: '/json/is_connected.php',
            method: 'get',
        }).done(function (data) {
            if (data.success) {
                createAlert('success', data.message);
                $('#actions')
                    .empty()
                    .append(
                        $('<button class="logButtons" type="button" id="logout"/>')
                            .html('Logout')
                            .on('click', function () {
                                $.ajax({
                                    url: '/json/logout.php',
                                    method: 'get'
                                }).done(function () {

                                    //$('.alerts').append($('<li class="success"> ' + data.message + ' </li>'));
                                    window.location.assign('/index.html');
                                })
                            })
                    );
            } else {
                window.location.assign('/index.html');
                //$('.alerts').append($('<li class="error">' + data.message + '</li>'));
            }
        }).fail(function () {
            $('.alerts').append($('<li class="error"> Fatal error ! </li>'));
        });
    });
})();
