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
    
    get note () {
        let self = this;
        let note = 0;
        $.ajax({
            url : '../json/notes.php',
            method : 'GET',
            async : false,
            data: 'IDV=' + self.id
        }).done((data) => {
            if (data.note) {
                note = data.note;
            }
        }).fail(() => {
            createAlert('error', 'Fatal error !');
        });
        return note;
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