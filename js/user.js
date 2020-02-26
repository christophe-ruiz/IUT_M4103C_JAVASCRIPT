class User {
    constructor (username, mail, pwd) {
        this.username = username;
        this.mail = mail;
        this.pwd = pwd;
    }

    get mail () {
        return this.mail;
    }

    get pwd () {
        return this.pwd;
    }

    get username () {
        return this.username;
    }

    set mail (m) {
        return this.mail = m;
    }

    set pwd (p) {
        return this.pwd = p;
    }

    set username (u) {
        return this.username = u;
    }
}