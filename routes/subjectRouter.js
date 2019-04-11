var express = require('express');
var router = express.Router();
const Subject = require('../models/modelSubject')



router.route('/').get(function(req, res) {
    Subject.find({}, function(err, subject) {
        if (err) {
            console.log(err)
        } else {
            res.render('subjectManage', { subject, subject })
        }
    })
})

router.route('/addSubject').get(function(req, res) {
    res.render('addSubject')
})

router.route('/post').post(function(req, res) {
    const subject = new Subject(req.body)
    subject.save().then(subject => {
        res.redirect('/manage/subject')
    }).catch(err => {
        res.status(400).send("unable to save to database")
    })
})

router.route('/edit/:id').get(function(req, res) {
    const id = req.params.id;
    Subject.findById(id, function(err, subject) {
        res.render('editSubject', { subject: subject })
    })
})

router.route('/update/:id').post(function(req, res) {
    Subject.findById(req.params.id, function(err, subject) {
        if (!subject)
            return next(new Error('Could not load Document'))
        else {
            // do your updates here
            subject.sub_id = req.body.sub_id
            subject.sub_name = req.body.sub_name
            subject.sub_status = req.body.sub_status
            subject.year = req.body.year
            subject.semester = req.body.semester
            subject.save().then(subject => {
                    res.redirect('/manage/subject')
                })
                .catch(err => {
                    res.status(400).send("unable to update the database")
                })
        }
    })
})

router.route('/delete/:id').get(function(req, res) {
    Subject.findByIdAndRemove({ _id: req.params.id },
        function(err, subject) {
            if (!subject) res.json(subject)
            else res.redirect('/manage/subject')
        })
})






module.exports = router;