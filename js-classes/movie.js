class Movie {
    constructor (m) {
        this.n = m.name;
        this.t = m.type;
        this.a = m.author;
        this.desc = m.description;
        this.d = m.year;
        this.c = m.id;
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
        return this.d;
    }
    get id () {
        return this.c;
    }

    show () {
        $('#results')
            .append(
                $('<div class="result"/>')
                    .append(
                        $('<div class="cover-container"/>')
                            .append(
                                $('<img src="../covers/' + this.id + '.jpg" alt=""/>')
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