class Video {
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

    static sortAndShow (v, where) {
        if (v.type === 'MOVIE') {
            let movie = new Movie({
                name : v.name,
                type : v.type,
                author : v.author,
                description : v.description,
                year : v.year,
                id : v.id,
                ext : v.ext,
                covExt : v.covExt,
            });
            movie.show(where);
        } else if (v.type === 'SHOW') {
            let show = new Show({
                name : v.name,
                type : v.type,
                author : v.author,
                description : v.description,
                year : v.year,
                id : v.id,
                ext : v.ext,
                covExt : v.covExt
            });
            show.show(where);
        }        
    }
}