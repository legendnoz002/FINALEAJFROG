const mongoose = require('mongoose')

const Schema = mongoose.Schema;

var User = new Schema ({
    username : {
        type : String
    },
    password : {
        type : String
    },
    uType : {
        type : String
    }
},{
    collection : 'person'
})

module.exports = mongoose.model('User', User);