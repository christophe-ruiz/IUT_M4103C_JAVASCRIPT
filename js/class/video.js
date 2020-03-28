class Video {
    constructor (m) {
        this._name = m.name;
        this._type = m.type;
        this._author = m.author;
        this._description = m.description;
        this._year = m.year;
        this._id = m.id;
        this._ext = m.ext;
        this._covExt = m.covExt;
    }

    get name () {
        return this._name;
    }
    get type () {
        return this._type;
    }
    get author () {
        return this._author;
    }
    get description () {
        return this._description;
    }
    get year () {
        return this._year;
    }
    get id () {
        return this._id;
    }
    get ext () {
        return this._ext;
    }
    get covExt () {
        return this._covExt;
    }
    
    get showNote () {
        'use strict';
        let self = this;
        $.ajax({
            url : '../json/get_rates.php',
            method : 'GET',
            data: 'IDV=' + self.id
        }).done((data) => {
            $('#note' + self.id).html(data.note + '/5.00');
        }).fail(() => {
            createAlert('error', 'Fatal error !');
        });
    }

    fillPlayer () {
        'use strict';
        $('#player-container')
            .empty()
            .css('display', 'flex')
            .append(
                $('<video controls>')
                    .attr({
                        'src' : "/content/" + this.type + "/"+ this.id + "." + this.ext,
                        'type' : "/video/" + this.ext
                    })
                    .css({
                        'width' : "60%",
                        'border' : 'solid 3px #101820',
                        'max-height': '95%'
                    })
            );
    }

    show (where) {
        'use strict';
        let self = this;
        $(where)
            .append(
                $('<div class="result"/>')
                    .css({
                        cursor: 'pointer'
                    })
                    .append(
                        $('<div class="cover-container"/>')
                            .append(
                                $('<img/>')
                                    .attr({
                                        'src' : "/covers/" + self.id + "." + self.covExt,
                                        'alt' : "Video id: " + self.id
                                    })
                            )
                            .on('click', () => {
                                self.fillPlayer();
                            }),
                        $('<div class="movie-text"/>')
                            .append(
                                $('<h2 class="title"/>')
                                    .html(self.name),
                                $('<p class="description"/>')
                                    .html(self.description),
                                $('<div class="more-info"/>')
                                    .append(
                                        $('<p class="description"/>')
                                            .html(self.year),

                                        $('<p class="description"/>')
                                            .html(self.author),

                                        $('<p class="description"/>')
                                            .html(self.type),

                                        $('<p class="description" id="note' + self.id + '"/>'),


                                        $('<form class="add-note" action="/json/rate.php" method="GET"/>')
                                            .append(
                                                $('<button type="button" class="minus"/>')
                                                    .html('-')
                                                    .on('click', function () {
                                                        let $value = $(this).next();
                                                        let val = parseInt($value.val()) - 1;
                                                        $value.val(val >= 0 ? val : 0);
                                                    }),
                                                $('<input type="text" name="rate" value="5" class="value"/>')
                                                    .on('change', function () {
                                                        if (parseInt($(this).val()) > 5) {
                                                            $(this).val( 5);
                                                        } else if (parseInt($(this).val()) < 0) {
                                                            $(this).val( 0);
                                                        }
                                                    }),
                                                $('<button type="button" class="plus"/>')
                                                    .html('+')
                                                    .on('click', function () {
                                                        let $value = $(this).prev();
                                                        let val = parseInt($value.val()) + 1;
                                                        $value.val(val <= 5 ? val : 5);
                                                    }),
                                                $('<input type="hidden" name="video" value="' + self.id + '"/>'),
                                                $('<button type="submit" class="rateBtn"/>')
                                                    .html('RATE')
                                                    .on('click', function () {
                                                        $.ajax({
                                                            url: $(this).parent().attr('action'),
                                                            method: $(this).parent().attr('method'),
                                                            data: $(this).parent().serialize()
                                                        }).done((data) => {
                                                            if (data.success) {
                                                                createAlert('success', data.msg);
                                                                self.showNote;
                                                            }
                                                            else {
                                                                createAlert('error', data.msg);
                                                            }
                                                        }).fail(() => {
                                                            createAlert('error', 'Fatal error !');
                                                        });
                                                        return false;
                                                    })
                                            )
                                    )
                            )
                    )
            );
    }

    static sortAndShow (v, where) {
        'use strict';
        let vid = undefined;
        if (v.type === 'MOVIE') {
            vid = new Movie({
                name : v.name,
                type : v.type,
                author : v.author,
                description : v.description,
                year : v.year,
                id : v.id,
                ext : v.ext,
                covExt : v.covExt,
            });
        } else if (v.type === 'SHOW') {
            vid = new Show({
                name : v.name,
                type : v.type,
                author : v.author,
                description : v.description,
                year : v.year,
                id : v.id,
                ext : v.ext,
                covExt : v.covExt,
                father : v.father
            });
        }
        if (where) {
            vid.show(where);
            vid.showNote;
        }
        return vid;
    }
}