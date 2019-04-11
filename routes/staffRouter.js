const express = require('express');
const router = express.Router();
const Staff = require('../models/modelStaff')
const bcrypt = require('bcrypt')


router.route('/').get(function (req, res) {
    Staff.find({ uType: "staff" }, function (err, person) {
        if (err) {
            console.log(err)
        }
        else {
            res.render('staffManage', { person: person })
        }
    })
})

router.route('/post').post(function (req, res) {
    const staff = Staff(req.body)
    staff.uType = "staff"

    bcrypt.hash(req.body.password, 4, (err, hash) => {
        staff.password = hash
        console.log(staff)
        staff.save().then(staff => { res.redirect('/manageStaff') }).catch(err => { res.status(400).send("unable to save to database") })
    })
})

router.route('/addStudent').get(function (req, res) {
    res.render('addStudent')
})
router.route('/addStaff').get(function (req, res) {
    res.render('addStaff')
})
router.route('/addTeacher').get(function (req, res) {
    res.render('addTeacher')
})


router.route('/edit/:id').get(function (req, res) {
    const id = req.params.id;
    Staff.findById(id, function (err, person) {
        res.render('editStaff', { person: person })
    })
})
router.route('/update/:id').post(function (req, res) {
    Staff.findById(req.params.id, function (err, person) {
        if (!person)
            return next(new Error('Could not load Document'))
        else {
            // do your updates here
            person.username = req.body.username
            person.password = req.body.password
            person.prefixName = req.body.prefixName
            person.ID = req.body.ID
            person.firstName = req.body.firstName
            person.lastName = req.body.lastName
            person.faculty = req.body.faculty
            person.major = req.body.major
            person.position = req.body.position

            bcrypt.hash(req.body.password, 4, (err, hash) => {

                if (!((req.body.password).length == 60)) {
                    console.log('is password')
                    person.password = hash
                }
                person.save().then(person => {
                    res.redirect('/manageStaff')
                }).catch(err => {
                    res.status(400).send("unable to update the database")
                })
            })
        }
    })
})


router.route('/delete/:id').get(function (req, res) {
    Staff.findByIdAndRemove({ _id: req.params.id },
        function (err, person) {
            if (!person) res.json(person)
            else res.redirect('/manageStaff')
        })
})


module.exports = router