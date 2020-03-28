(() => {
    'use strict';
    $(() => {
        $.ajax({
            url: '/json/is_connected.php',
            method: 'get',
        }).done((data) => {
            let $mostRecent = $('#most-recent');
            if (!$mostRecent.length) {
                mostRecent();
            }
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
                                        .css('display', 'flex');
                                    getVideosAndUsers();
                                } else {
                                    $(this).data('clicked', !$(this).data('clicked'));
                                    $('#admin-panel')
                                        .slideUp(500)
                                }
                            })
                    );
                }

                $('#type').on('change', function () {
                    if ($(this).val() === 'SHOW') {
                        $(this).after(
                            $('<label for="firstEp"/>').html('NEW SHOW'),
                            $('<input id="firstEp" class="content-form" type="checkbox" name="firstEp" checked />')
                                .on('change', function () {
                                    if (!$(this).is(':checked')) {
                                        $(this).after(
                                            $('<select id="shows" class="content-form" name="fatherShow"/>')
                                        );
                                        getShows();
                                    } else {
                                        $('#shows').remove();
                                    }
                                })
                        )
                    }
                });

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
                                let $mostRecent = $('#most-recent');
                                if ($mostRecent.length) {
                                    $mostRecent.remove();
                                    mostRecent();
                                }
                                data.successMsg.forEach( msg => {
                                    createAlert('success', msg);
                                });
                                data.errorMsg.forEach(msg => {
                                    createAlert('error', msg);
                                });
                            }
                            $('#upload-form')[0].reset()
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
                            }).done((data) => {
                                if (data.profile) {
                                    $('#profile-container').slideUp('fast');
                                    $(self).html('Profile');
                                } else {
                                    $('#profile-container').empty()
                                        .append(
                                            $('<h2/>')  .html(data.username),
                                            $('<span>') .html('Registered on : ' + data.date),
                                            $('<span>') .html(data.admin),
                                            $('<button type="button" id="trash"/>')
                                                .html('DELETE ACCOUNT 🗑️')
                                                .on('click', () => {
                                                    confirmDelAccount('me')
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
                            }).done(() => {
                                window.location.assign('/index.html');
                            })
                        })
                );
            } else {
                window.location.assign('/index.html');
            }
        }).fail(() => {
            $('.alerts').append($('<li class="error"> Fatal error ! </li>'));
        });
    });
})();
