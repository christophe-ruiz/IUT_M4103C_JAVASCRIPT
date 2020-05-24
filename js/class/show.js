class Show extends Video {
    constructor (s) {
        super(s);
        this._father = s.father;
    }

    get father () {
        return this._father;
    }

    fillPlayer() {
        'use strict';
        super.fillPlayer();
        let t = $('#thread');
        if (t.length) {
            t.remove();
        }
        $('#player-container')
            .append(
                $('<div id="thread">')
                    .css({
                        'display': 'flex',
                        'flex-direction': 'column',
                        'align-items': 'center',
                        'margin-top': '3vw',
                        'margin-left': '2vw',
                        'align-self': 'flex-start',
                        'color': 'white',
                    })
            );
        $.ajax({
            url : '/json/getThread.php',
            method : 'get',
            data : {'which' : this.id}
        }).done((data) => {
            data.thread.forEach(vid => {
                $('#thread').append(
                    $('<div>').append(
                        $('<img>').attr({
                            'src' : '/covers/' + vid.id + '.' + vid.covExt,
                            'alt' : 'Video id: ' + vid.id
                        }).css( {
                            'height' : '100%',
                            'cursor' : 'pointer',
                            'margin-right' : '1vw',
                        }),
                        $('<span>').html(vid.name),
                    ).on('click', function () {
                        let episode = new Show({
                            name : vid.name,
                            type : vid.type,
                            author : vid.author,
                            description : vid.description,
                            year : vid.year,
                            id : vid.id,
                            ext : vid.ext,
                            covExt : vid.covExt,
                            father : vid.father
                        });
                        episode.fillPlayer();
                    }).css( {
                        'display' : 'flex',
                        'align-items' : 'center',
                        'height' : '3vw',
                        'margin-bottom' : '1vw',
                        'width' : '100%'
                    })
                )
            })
        }).fail(() => {
            createAlert('error', 'Fatal error !');
        })
    }

    show (where) {
        super.show(where);
    }

}