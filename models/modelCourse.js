const mongoose = require('mongoose')

const Schema = mongoose.Schema;

var course = new Schema({
    course_id: {
        type: String
    },
    course_name: {
        type: String
    },
    section: {
        type: String
    },
    course_teacher: {
        type: Array
    },
    course_student: {
        type: Array
    },
    course_test: {
        type: Array
    },
    ID: {
        type: String
    }
}, {
    collection: 'course'
})

module.exports = mongoose.model('modelCourse', course);