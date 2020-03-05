class Movie {
    constructor (m) {
        this.n = m.name;
        this.t = m.type;
        this.a = m.author;
        this.desc = m.description;
        this.y = m.year;
        this.c = m.id;
        this.e = m.ext;
        this.ce = m.covExt;
    }
    
    get name () {
        return this.n;
    }
    get type () {
        return this.t;
    }
    get author () {
        return this.a;
    }
    get description () {
        return this.desc;
    }
    get year () {
        return this.y;
    }
    get id () {
        return this.c;
    }
    get ext () {
        return this.e;
    }
    get covExt () {
        return this.ce;
    }

    show () {
        let self = this;
        $('#results')
            .append(
                $('<div class="result"/>')
                    .on('click', function () {
                        if (!$('#player-container').length) {
                            $('.alerts')
                                .after(
                                    $('<div id="player-container"/>')
                                );
                        }
                        $('#player-container')
                            .empty()
                            .append(
                                    $('<video controls>')
                                        .attr({
                                            src : "/content/" + self.type + "/"+ self.id + "." + self.ext,
                                            type : "video/" + self.ext
                                        })
                                        .css({
                                            width : "60%",
                                            border : 'solid 3px #101820'
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