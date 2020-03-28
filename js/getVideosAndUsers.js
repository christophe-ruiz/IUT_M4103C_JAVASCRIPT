let getVideosAndUsers = function () {
    'use strict';
    $.ajax({
        url : '/json/getVideosAndUsers.php',
        method : 'get',
    }).done((data) => {
        let uc = $('#userConsole');
        uc.empty();
        data.users.forEach(usr => {
            uc.append(
                $('<div class="dbElement">').append(
                    $('<span>')
                        .html(usr.name.length > 25 ? usr.name.substring(0, 22) + ('...') : usr.name),
                    $('<p>')
                        .html('Registered on ' + usr.date),
                    $('<button type="button" class="del"/>')
                        .html('🗑️')
                        .on('click', () => {
                            confirmDelAccount (usr.name);
                        })
                )
            )
        });
        let vc = $('#videoConsole');
        vc.empty();
        data.videos.forEach(vid => {
            vc.append(
                $('<div class="dbElement">').append(
                    $('<span>')
                        .html(vid.id),
                    $('<span>')
                        .html(vid.title),
                    $('<div>')
                        .css({
                            'display' : 'flex',
                            'justify-content' : 'space-between',
                            'align-items' : 'center',
                            'width' : '5vw'
                        })
                        .append(
                            $('<span>')
                                .html(vid.ratings),
                            $('<button type="button" class="del"/>')
                                .html('🗑️')
                                .on('click', () => {
                                    confirmDelVideo(vid.id);
                                })
                        )
                )
            )
        })
    }).fail(() => {
        createAlert('error', 'Fatal error !');
    })
};

let getShows = function () {
    $.ajax({
        url: "/json/getShows.php",
        method: "get"
    }).done((data) => {
        let s = $('#shows');
        data.shows.forEach(show => {
            s.append(
                $('<option/>')
                    .attr('value', show.id)
                    .html(show.title)
            )
        });
        s.children().first().attr('selected', 'selected');
    }).fail(() => {
        createAlert('error', 'Fatal error !');
    })
}