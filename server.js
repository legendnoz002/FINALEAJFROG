const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const buildingManage = require('./routes/buildingRouter')
const studentManage = require('./routes/studentRouter')
const staffManage = require('./routes/staffRouter')
const teacherManage = require('./routes/teacherRouter')
const yearManage = require('./routes/yearRouter')
const courseManage = require('./routes/courseRouter')
const User = require('./models/user')




mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test:test123@ds117816.mlab.com:17816/ooad');

//ID: legendnoz002
//PASSWORD: legendnoz007 



app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/manageStudent', studentManage)
app.use('/manageStaff', staffManage)
app.use('/manageTeacher', teacherManage)
app.use('/manageCourse', courseManage)
app.use('/manageYear', yearManage)
app.use('/building' , buildingManage)

app.get('/', function (req, res) {
  res.render('login', { err: false })
})

app.get('/main', function (req, res) {
  res.render('menuTeacher')
})



app.listen(port, function () {
  console.log('Node js Express js Tutorial at port', port)
})

app.post('/login', function (req, res) {
  let username = req.body.username
  let password = req.body.password
  User.findOne({ username: username }, function (err, user) { // แก้
//console.log(user)
    if (err) {
      console.log(err)
      return res.render('login', { err: true })
    }
    if (!user) {
      return res.render('login', { err: true })
    }else {
      bcrypt.compare(req.body.password , user.password , (err , login) =>{
        //if login == true password correct
        if(login){
         if(user.uType === 'teacher'){
          res.render('menuTeacher')
         }else if(user.uType === 'staff') {
          res.render('menuTeacher')
         }else if(user.uType === 'student'){
          res.render('menuTeacher')
         }else if (user.uType === 'admin'){
          res.render('menuTeacher')
         }else {
            res.render('login' , {err : true})
         }
        }else{
           res.render('login' , {err : true})
        }
      })
    }
  })
})