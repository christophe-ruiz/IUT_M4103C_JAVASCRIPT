let confirmDelAccount = (who) => {
    $('body')
        .append(
            $('<div id="confirm-container" />')
                .hide()
                .append(
                    $('<span/>')
                        .html('Are you sure about that ?'),
                    $('<div/>').append(
                        $('<button>')
                            .attr('type', 'button')
                            .html('YES')
                            .on('click', () => {
                                let cc = $('#confirm-container');
                                cc.fadeOut('500');
                                setTimeout(() => {
                                    cc.remove();
                                }, 500);

                                $.ajax({
                                    url: '/json/deleteAccount.php',
                                    method: 'get',
                                    data: {'who' : who}
                                }).done((data) => {
                                    $('body').css({
                                        'overflow' : 'auto'
                                    });
                                    if (data.success) {
                                        if (who === 'me') {
                                            window.location.assign('/index.html');
                                        } else {
                                            createAlert('success', data.message);
                                            $('#userConsole>.dbElement>span').each(function (i, e) {
                                                if ($(e).text() === data.who) {
                                                    $(e).parent().slideUp('fast');
                                                }
                                            })
                                        }
                                    } else {
                                        createAlert('error', data.message);
                                    }
                                }).fail(() => {
                                    createAlert('error', 'Fatal error !');
                                })
                            }),
                        $('<button/>')
                            .attr('type', 'button')
                            .html('NO')
                            .on('click', () => {
                                $('body')
                                    .css('overflow', 'auto');
                                let cc = $('#confirm-container');
                                cc.fadeOut('500');
                                setTimeout(() => {
                                    cc.remove();
                                }, 500);
                            })
                    )
                )
                .fadeIn('500')
                .css('display', 'flex')
        )
        .css('overflow', 'hidden');
};

function confirmDelVideo (which) {
    $('body')
        .css('overflow', 'hidden')
        .append(
            $('<div id="confirm-container" />')
                .hide()
                .append(
                    $('<span/>')
                        .html('Are you sure about that ?'),
                    $('<div/>').append(
                        $('<button>')
                            .attr('type', 'button')
                            .html('YES')
                            .on('click', () => {

                                let cc = $('#confirm-container');
                                cc.fadeOut('500');
                                setTimeout(() => {
                                    cc.remove();
                                }, 500);

                                $.ajax({
                                    url: '/json/deleteVideo.php',
                                    method: 'get',
                                    data: {'which' : which}
                                }).done((data) => {
                                    $('body').css({
                                        'overflow' : 'auto'
                                    });
                                    if (data.success) {
                                        createAlert('success', data.msg);
                                        $('#videoConsole>.dbElement>span').each(function (i, e) {
                                            if (parseInt($(e).text()) === which) {
                                                $(e).parent().slideUp('fast');
                                            }
                                        });
                                        mostRecent();
                                    } else {
                                        createAlert('error', data.msg);
                                    }
                                }).fail(() => {
                                    createAlert('error', 'Fatal error !');
                                })
                            }),
                        $('<button/>')
                            .attr('type', 'button')
                            .html('NO')
                            .on('click', () => {
                                $('body')
                                    .css('overflow', 'auto');
                                let cc = $('#confirm-container');
                                cc.fadeOut('500');
                                setTimeout(() => {
                                    cc.remove();
                                }, 500);
                            })
                    )
                )
                .fadeIn('500')
                .css('display', 'flex')
        )
}