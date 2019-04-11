const mongoose = require('mongoose')
const Schema = mongoose.Schema

var exam = new Schema ({
    examId : String ,       // [PK]
    semester : String ,     // ดึงจาก Year.semester
    date : String ,
    timeStart : String ,
    timeFinish : String ,
    status : String ,
    buildingName : String , // ใช้ buildingName จาก Building [FK]
    roomName : String ,     // ดึงจาก Building.room[String]
    score : [{
        semester : String ,
        studentId : String ,
        point : String
    }]
} , {collation : 'exam'})

module.exports = mongoose.model('modelExam' , exam)