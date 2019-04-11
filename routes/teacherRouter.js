var express = require('express')
var router = express.Router()
const Teacher = require('../models/modelTeacher')
const bcrypt = require('bcrypt')

router.route('/').get(function (req, res) {
  Teacher.find({ uType: 'teacher' }, function (err, person) {
    if (err) {
      console.log(err)
    } else {
      // eslint-disable-next-line no-dupe-keys
      res.render('teacherManage', { person, person })
    }
  })
})

router.route('/addTeacher').get(function (req, res) {
  res.render('addTeacher')
})
router.route('/addStaff').get(function (req, res) {
  res.render('addStaff')
})

router.route('/addTeacher').get(function (req, res) {
  res.render('addTeacher')
})

router.route('/post').post(function (req, res) {
  const teacher = new Teacher(req.body)
  teacher.uType = 'teacher'
  bcrypt.hash(teacher.password, 4, (err, hash) => {
    console.log(hash)
    teacher.password = hash
    teacher.save().then(() => { res.redirect('/manageTeacher') }).catch(() => { res.status(400).send('unable to save to database') })
  })
})

router.route('/edit/:id').get(function (req, res) {
  const id = req.params.id
  Teacher.findById(id, function (_err, person) {
    res.render('editTeacher', { person: person })
  })
})

router.route('/update/:id').post(function (req, res) {
  Teacher.findById(req.params.id, function (_err, person) {
    // eslint-disable-next-line no-undef
    if (!person) { return next(new Error('Could not load Document')) } else {
      // do your updates here
      person.username = req.body.username
      person.password = req.body.password
      person.prefixName = req.body.prefixName
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
          res.redirect('/manageTeacher')
        }).catch(() => {
          res.status(400).send('unable to update the database')
        })
      })


    }
  })
})

router.route('/delete/:id').get(function (req, res) {
  Teacher.findByIdAndRemove({ _id: req.params.id },
    function (_err, person) {
      if (!person) res.json(person)
      else res.redirect('/manageTeacher')
    })
})

router.route('/info/:id').get((req, res) => {
  Teacher.findById(req.params.id, (err, person) => {
    if (err) {
      console.log(err)
    } else {
      res.render('teacherInfo', { person: person })
    }
  })
})

module.exports = router
