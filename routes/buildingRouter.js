var express = require('express');
var router = express.Router();
const Building = require('../models/modelBuilding')



router.route('/').get(function(req, res) {
    Building.find(function(err, building) {
        if (err) {
            console.log(err)
        } else {
            res.render('buildingManage', { building, building })
        }
    })
})


router.route('/create').post(function(req, res) {
    const building = new Building(req.body)
    building.save().then(building => {
        res.redirect('/building')
    }).catch(err => {
        console.log(err)
        res.status(400).send("unable to save to database")
    })
})


router.post('/updateBuilding', (req, res, next) => {
    Building.findByIdAndUpdate(req.body._id, {
        buildingName: req.body.editbuildingName,
        floor: req.body.editfloor
    }, (err, data) => {
        console.log(req.body._id)
        console.log(req.body)
        if (err) {
            return res.status(500).send(err.message)
        }
        res.redirect('/building')
    })
})



router.route('/delete/:id').get(function(req, res) {
    Building.findByIdAndRemove({ _id: req.params.id },
        function(err, building) {
            if (!building) res.json(building)
            else res.redirect('/building')
        })
})

//ของตูน-----------------------------------------

router.route('/room/:id').get(function(req, res) {
    const id = req.params.id;
    Building.findById(id, function(err, building) {
        if (err) {
            console.log(err)
        } else {
            res.render('roomManage', { building, building })
        }
    })
})



router.route('/addRoom/:id').post(function(req, res) {
    var obj = {
        room_name: req.body.roomName,
        floor_room: req.body.floor,
        column_room: req.body.column,
        row_room: req.body.row
    }
    console.log(obj);

    Building.findByIdAndUpdate({ _id: req.params.id }, { $push: { room: obj } }, function(err, building) {
            if (err) {
                console.log(err)
            } else {
                res.render('roomManage', { building, building })
            }
        })
        // Building.findById(id, function (err, building) {

    //     res.render('roomManage')
    // })


})
router.route('/deleteRoom/:roomid/:id').get(function(req, res) {
    const id = req.params.id;
    const roomid = req.params.roomid

    Building.update({ _id: id }, { $pull: { room: { _id: roomid } } }, { safe: true },
        function removeConnectionsCB(err, building) {
            res.redirect('/building/room/:id')
        })



})

//จบของตูน---------------------------------------------------



module.exports = router;