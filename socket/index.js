const Messages = require('../models/Messages');

class SocketHander {

    constructor() {
        this.db;
    }

    connect() {
        this.db = require('mongoose').connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`);
        this.db.Promise = global.Promise;
    }

    getMessages() {
        return Messages.find();
    }

    storeMessages(data) {

        console.log(data);
        const newMessages = new Messages({
            name: data.name,
            msg: data.msg,
            time: 1516898432214.0
        });

        const doc = newMessages.save();
    }

}

module.exports = SocketHander;