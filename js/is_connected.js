(function () {
    'use strict';
    $(() => {
        $.ajax({
            url: '/json/is_connected.php',
            method: 'get',
        }).done(function (data) {
            if (data.success) {
                if (data.message !== "") {
                    createAlert('success', data.message);
                }
                let action = $('#actions');
                action.empty();
                if (data.is_admin) {
                    action.append(
                        $('<button class="logButtons" type="button" id="admin-button"/>')
                            .html('Admin')
                            .data({
                                clicked: false
                            })
                            .on('click', function () {
                                if (!$(this).data('clicked')) {
                                    $(this).data('clicked', !$(this).data('clicked'));
                                    createAlert('info', 'Welcome to the administration panel');
                                    $('#admin-panel')
                                        .slideDown('fast')
                                        .css('display', 'flex')
                                } else {
                                    $(this).data('clicked', !$(this).data('clicked'));
                                    $('#admin-panel')
                                        .slideUp(500)
                                }
                            })
                    )
                }
                $('#test, #upload-form')
                    .on('submit', function (e) {
                        e.preventDefault();
                        $.ajax({
                            url: $(this).attr('action'),
                            type: $(this).attr('type'),
                            method: $(this).attr('method'),
                            data: new FormData(this),
                            contentType: false,
                            cache: false,
                            processData:false,
                        }).done(function (data) {
                            console.log(data);
                            data.successMsg.forEach( msg => {
                                createAlert('success', msg);
                            });
                            data.errorMsg.forEach(msg => {
                                createAlert('error', msg);
                            });
                            $(this).closest('form').find("input, textarea, select").val("");
                        }).fail(function () {
                            createAlert('error', 'Fatal error !');
                        });
                        return false;
                    });
                action.append(
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
