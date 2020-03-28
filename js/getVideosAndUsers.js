let getVideosAndUsers = function () {
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
                            console.log(usr.name);
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
                                    console.log(vid.id);
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