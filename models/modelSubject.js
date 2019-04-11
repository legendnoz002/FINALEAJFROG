const mongoose = require('mongoose')

const Schema = mongoose.Schema;

var subject = new Schema({

    sub_id: {
        type: String
    },
    sub_name: {
        type: String
    },
    sub_status: {
        type: String
    },
    year: {
        type: String
    },
    semester: {
        type: String
    },
    course_ID: {
        type: Array
    },
    ID: {
        type: String
    }
    
}, {
    collection: 'subject'
})

module.exports = mongoose.model('modelSubject', subject);