function mostRecent () {
    $(() => {
        $.ajax({
            url: "/json/mostrecent.php",
            method: "post",
        }).done(function (data) {
            if (data.success) {
                let title = $('<h1/>')
                    .html('LATEST UPLOADS')
                    .css({
                        'color' : 'white',
                        'font-size' : '5vw',
                    });
                let mr = $('#most-recent');
                if (mr.length) {
                    $('#most-recent').empty()
                }
                $('#search-form-container')
                    .after(
                        $('<div id="most-recent"/>')
                            .css({
                                'display' : 'flex',
                                'justify-content' : 'center',
                                'align-items' : 'center',
                                'flex-direction' : 'column',
                                'background' : 'black'
                            })
                            .append(title)
                    );
                data.results.forEach( r => {
                    Video.sortAndShow(r, "#most-recent");
                })
            } else {
                createAlert('error', data.message);
            }
        }).fail(function () {
            createAlert('error', 'Fatal Error !')
        })
    })
};