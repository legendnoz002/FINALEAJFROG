var express = require('express');
var router = express.Router();
const Course = require('../models/modelCourse')
const Year = require('../models/modelYear')



router.route('/').get(function(req, res){
    Course.find({}, function (err , course) {
        if(err) {
            console.log(err)
        }else {
            res.render('courseManage' , {course , course})
        }
    })
})

router.get('/allJson' , (req , res) => {
    Course.find({} , (err , data) => {
        res.send(data)
        console.log(data)
    })
})

router.route('/addCourse').get(function (req, res) {
    
    Year.find({} , (err , year) => {
        //console.log(year)
        res.render('addCourse' , {year : year})
    })
   
})

router.route('/post').post(function (req, res) {
    const course = new Course(req.body)
    course.save().then(course => { 
        res.redirect('/manageCourse') 
    }).catch(err => { 
        res.status(400).send("unable to save to database") 
    })
})

router.route('/edit/:id').get(function (req, res) {
    const id = req.params.id;
    Course.findById(id, function (err, course) {
        res.render('editCourse', { course: course })
    })
})

router.route('/update/:id').post(function (req, res) {
    Course.findById(req.params.id, function (err, course) {
        if (!course)
            return next(new Error('Could not load Document'))
        else {
            // do your updates here
            course.course_id = req.body.course_id
            course.course_name = req.body.course_name
            course.section = req.body.section
            course.year = req.body.year
            course.save().then(course => {
                res.redirect('/manage/course')
            })
                .catch(err => {
                    res.status(400).send("unable to update the database")
                })
        }
    })
})

router.route('/delete/:id').get(function (req, res) {
    Course.findByIdAndRemove({ _id: req.params.id },
        function (err, course) {
            if (!course) res.json(course)
            else res.redirect('/manage/course')
        })
})






module.exports = router ;