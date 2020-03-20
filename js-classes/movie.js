class Movie extends Video{
    constructor (m) {
        super(m);
    }

    show (where) {
        let self = this;
        $(where)
            .append(
                $('<div class="result"/>')
                    .on('click', function () {
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
                    })
                    .css({
                        cursor: 'pointer'
                    })
                    .append(
                        $('<div class="cover-container"/>')
                            .append(
                                $('<img src="../covers/' + this.id + '.' + this.covExt + '" alt=""/>')
                            ),
                        $('<div class="movie-text"/>')
                            .append(
                                $('<h2 class="title"/>')
                                    .html(this.name),
                                $('<p class="description"/>')
                                    .html(this.description),
                                $('<div class="more-info"/>')
                                    .append(
                                        $('<p class="description"/>')
                                            .html(this.year),

                                        $('<p class="description"/>')
                                            .html(this.author),

                                        $('<p class="description"/>')
                                            .html(this.type)
                                    )
                            )
                    )
            )
    }
}