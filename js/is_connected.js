(() => {
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
                    );
                }
                $('#upload-form')
                    .on('submit', function (e) {
                        e.preventDefault();
                        $.ajax({
                            url: $(this).attr('action'),
                            type: $(this).attr('type'),
                            method: $(this).attr('method'),
                            data: new FormData(this),
                            contentType: false,
                            cache: false,
                            processData:false
                        }).done(function (data) {
                            if (data.unauthorized) {
                                createAlert('error', data.unauthorized);
                            }
                            else {
                                data.successMsg.forEach( msg => {
                                    createAlert('success', msg);
                                });
                                data.errorMsg.forEach(msg => {
                                    createAlert('error', msg);
                                });
                            }
                            $(this).closest('form').find("input, textarea, select").val("");
                        }).fail(function () {
                            createAlert('error', 'Fatal error !');
                        });
                        return false;
                    });

                action.append(
                    $('<button class="logButtons" type="button" id="profile"/>')
                        .html('Profile')
                        .on('click', function () {
                            let self = this;
                            $.ajax({
                                url: '/json/profile.php',
                                method: 'get'
                            }).done(function (data) {
                                console.log(data);
                                if (data.profile) {
                                    $('#profile-container').slideUp('fast');
                                    $(self).html('Profile');
                                } else {
                                    $('#profile-container')
                                        .empty()
                                        .append(
                                            $('<h2/>')  .html(data.username),
                                            $('<span>') .html('Registered on : ' + data.date),
                                            $('<span>') .html(data.admin),
                                            $('<button type="button" id="trash"/>')
                                                .html('DELETE ACCOUNT &#128465')
                                                .on('click', function () {
                                                    $.ajax({
                                                        url: '/json/deleteAccount.php',
                                                        method: 'get'
                                                    }).done((data) => {
                                                        if (data.success) {
                                                            window.location.assign('/index.html');
                                                        } else {
                                                            createAlert('error', data.message);
                                                        }
                                                    })
                                                })
                                        )
                                        .slideDown('fast')
                                        .css('display', 'flex');
                                    $(self).html('Close');
                                }
                            })
                        }),
                    $('<button class="logButtons" type="button" id="logout"/>')
                        .html('Logout')
                        .on('click', function () {
                            $.ajax({
                                url: '/json/logout.php',
                                method: 'get'
                            }).done(function () {
                                window.location.assign('/index.html');
                            })
                        })
                );
            } else {
                window.location.assign('/index.html');
            }
        }).fail(function () {
            $('.alerts').append($('<li class="error"> Fatal error ! </li>'));
        });
    });
})();
