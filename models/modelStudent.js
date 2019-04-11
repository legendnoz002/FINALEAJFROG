const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    uType: {
        type: String
    },
    studentId: {
        type: Number
    },
    prefixName: {
        type: String
    },
    firstName: {
        type: String
    }, 
    lastName: {
        type: String
    }, 
    faculty: {
        type: String
    }, 
    major: {
        type: String
    }, 
    year: {
        type: Number
    }, 
    branch: {
        type: String
    }, 
    sector: {
        type: Number
    },
    ID: {
        type: String
    }
}, { collection: 'person' })


module.exports = mongoose.model('modelStudent', User);