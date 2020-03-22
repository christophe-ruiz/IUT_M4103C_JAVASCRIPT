class Movie extends Video{
    constructor (m) {
        super(m);
    }

    show (where) {
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
                                $('<img src="../covers/' + self.id + '.' + self.covExt + '" alt=""/>')
                            ).on('click', function () {
                            $('#player-container')
                                .empty()
                                .css('display', 'flex')
                                .append(
                                    $('<video controls>')
                                        .attr({
                                            'src' : "/content/" + self.type + "/"+ self.id + "." + self.ext,
                                            'type' : "/video/" + self.id + '.' + self.ext
                                        })
                                        .css({
                                            'width' : "60%",
                                            'border' : 'solid 3px #101820',
                                            'max-height': '100%'
                                        })
                                );
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
                                                $('<input type="text" name="rate" value="5" class="value"/>'),
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
                                                            console.log(data);
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
}